import { sample, sampleSize, sortBy } from 'lodash';
import {
  Combat,
  Combatant,
  CombatId,
  CombatLog,
  CombatSkill,
  WorldLocation,
} from '../interfaces';
import { getEntry } from './content';
import { addItemToInventory, createItem } from './equipment';
import {
  exploreProgressPercent,
  travelHome,
  updateExploringAndGlobalStatusText,
} from './explore';
import { allHeroes, heroGainXp } from './hero';
import { notify } from './notify';
import { uuid } from './rng';
import { localStorageSignal } from './signal';
import { gamestate, updateGamestate } from './state-game';
import { getWorldNode } from './world';

export const combatLog = localStorageSignal<CombatLog[]>('combatLog', []);

export function logCombatMessage(combat: Combat, message: string): void {
  const newLog: CombatLog = {
    combatId: combat.id,
    messageId: uuid(),
    timestamp: Date.now(),
    locationName: combat.locationName,
    message,
  };

  combatLog.update((logs) => [newLog, ...logs].slice(0, 500));
}

export function currentCombat(): Combat | undefined {
  return gamestate().hero.combat;
}

export function currentCombatHasGuardiansAlive(): boolean {
  const combat = currentCombat();
  if (!combat) return false;
  return combat.guardians.some((guardian) => !isDead(guardian));
}

export function generateCombatForLocation(location: WorldLocation): Combat {
  const heroes: Combatant[] = allHeroes().map((h) => ({
    id: h.id,
    name: h.name,

    baseStats: h.baseStats,
    stats: h.baseStats,
    hp: h.baseStats.health,
    level: h.level,
    sprite: h.sprite,
  }));

  const guardians: Combatant[] = location.guardians.map((g) => ({
    id: g.id,
    name: g.name,

    baseStats: g.stats,
    stats: g.stats,
    hp: g.stats.health,
    level: location.encounterLevel,
    sprite: g.sprite,
  }));

  return {
    id: uuid() as CombatId,
    locationName: location.name,
    locationPosition: {
      x: location.x,
      y: location.y,
    },
    rounds: 0,
    heroes,
    guardians,
  };
}

export function availableSkillsForCombatant(): CombatSkill[] {
  return ['Attack'].map((s) => getEntry<CombatSkill>(s)!);
}

export function orderCombatantsBySpeed(combat: Combat): Combatant[] {
  return sortBy([...combat.guardians, ...combat.heroes], (c) => -c.stats.speed);
}

export function getCombatantTargetsForSkill(
  combat: Combat,
  combatant: Combatant,
  skill: CombatSkill,
): Combatant[] {
  const myType = combatant.id.startsWith('guardian-') ? 'guardian' : 'hero';
  const allies = myType === 'guardian' ? combat.guardians : combat.heroes;
  const enemies = myType === 'guardian' ? combat.heroes : combat.guardians;

  if (skill.targetType === 'all') {
    return [...allies, ...enemies].filter((c) => !isDead(c));
  }

  if (skill.targetType === 'enemies') {
    return enemies.filter((g) => !isDead(g));
  }

  if (skill.targetType === 'allies') {
    return allies.filter((h) => !isDead(h));
  }

  if (skill.targetType === 'self') {
    return [combatant];
  }

  return [];
}

export function applySkillToTarget(
  combat: Combat,
  combatant: Combatant,
  target: Combatant,
  skill: CombatSkill,
): void {
  const damage = Math.max(
    0,
    Math.floor(
      combatant.stats.force * (skill.damageScaling.force ?? 0) +
        combatant.stats.aura * (skill.damageScaling.aura ?? 0) +
        combatant.stats.health * (skill.damageScaling.health ?? 0) +
        combatant.stats.speed * (skill.damageScaling.speed ?? 0),
    ),
  );

  const targetDefense = target.stats.aura;
  const effectiveDamage = Math.floor(
    Math.max(damage > 0 ? 1 : 0, damage - targetDefense),
  );

  target.hp = Math.max(0, target.hp - effectiveDamage);
  logCombatMessage(
    combat,
    `**${combatant.name}** uses **${skill.name}** on **${target.name}** for ${damage} damage (${target.hp}/${target.stats.health} HP remaining).`,
  );

  if (isDead(target)) {
    logCombatMessage(combat, `**${target.name}** has been defeated!`);
  }
}

export function combatantTakeTurn(combat: Combat, combatant: Combatant): void {
  if (isDead(combatant)) {
    logCombatMessage(combat, `**${combatant.name}** is dead, skipping turn.`);
    return;
  }

  const skills = availableSkillsForCombatant();
  const chosenSkill = sample(skills);
  if (!chosenSkill) {
    logCombatMessage(
      combat,
      `**${combatant.name}** has no skills available, skipping turn.`,
    );
    return;
  }

  const targets = sampleSize(
    getCombatantTargetsForSkill(combat, combatant, chosenSkill),
    chosenSkill.targets,
  );

  targets.forEach((target) => {
    // check for early termination of combat
    if (isCombatOver(combat)) return;

    applySkillToTarget(combat, combatant, target, chosenSkill);
  });
}

export function isDead(combatant: Combatant): boolean {
  return combatant.hp <= 0;
}

export function isCombatOver(combat: Combat): boolean {
  const allHeroesDead = combat.heroes.every((hero) => isDead(hero));
  const allGuardiansDead = combat.guardians.every((guardian) =>
    isDead(guardian),
  );

  return allHeroesDead || allGuardiansDead;
}

export function didHeroesWin(combat: Combat): boolean {
  return combat.guardians.every((guardian) => isDead(guardian));
}

export function handleCombatVictory(combat: Combat): void {
  logCombatMessage(combat, 'Heroes have won the combat!');

  const currentNode = getWorldNode(
    combat.locationPosition.x,
    combat.locationPosition.y,
  );

  if (currentNode) {
    const xpGainedForClaim =
      currentNode.encounterLevel * currentNode.guardians.length;
    notify(`You have claimed ${currentNode.name}!`, 'LocationClaim');

    logCombatMessage(combat, `Heroes claimed **${currentNode.name}**!`);
    updateExploringAndGlobalStatusText('');
    exploreProgressPercent.set(0);

    allHeroes().forEach((hero) => {
      logCombatMessage(
        combat,
        `**${hero.name}** gained ${xpGainedForClaim} XP!`,
      );
      heroGainXp(hero, xpGainedForClaim);
    });

    currentNode.claimLoot.forEach((lootDef) => {
      const item = createItem(lootDef);

      addItemToInventory(item);

      logCombatMessage(combat, `Heroes found **${item.name}**!`);
    });
  }

  updateGamestate((state) => {
    const updateNodeData = getWorldNode(
      combat.locationPosition.x,
      combat.locationPosition.y,
      state,
    );

    if (updateNodeData) {
      updateNodeData.claimCount++;
      updateNodeData.currentlyClaimed = true;
      updateNodeData.guardians = [];
      updateNodeData.claimLoot = [];
    }

    state.hero.combat = undefined;

    return state;
  });
}

export function handleCombatDefeat(combat: Combat): void {
  logCombatMessage(combat, 'Heroes have lost the combat!');
  logCombatMessage(combat, 'Heroes have been sent home for recovery!');

  travelHome();
}

export function checkCombatOver(combat: Combat): boolean {
  if (!isCombatOver(combat)) return false;

  logCombatMessage(combat, 'Combat is over.');

  if (didHeroesWin(combat)) {
    handleCombatVictory(combat);
  } else {
    handleCombatDefeat(combat);
  }

  resetCombat();

  return true;
}

export function doCombatIteration(): void {
  const combat = currentCombat();
  if (!combat) return;

  if (checkCombatOver(combat)) return;

  logCombatMessage(combat, `_Combat round ${combat.rounds + 1}._`);

  const turnOrder = orderCombatantsBySpeed(combat);
  turnOrder.forEach((char) => {
    combatantTakeTurn(combat, char);
  });

  updateGamestate((state) => {
    combat.rounds++;
    state.hero.combat = combat;
    return state;
  });

  checkCombatOver(combat);
}

export function resetCombat(): void {
  updateGamestate((state) => {
    state.hero.combat = undefined;
    return state;
  });
}
