import { intersection, sample, sampleSize, sortBy, sum, union } from 'lodash';
import Mustache from 'mustache';
import {
  Combat,
  Combatant,
  CombatId,
  CombatLog,
  DroppableEquippable,
  ElementBlock,
  EquipmentSkill,
  EquipmentSkillDefinition,
  EquipmentSkillDefinitionTechnique,
  EquippableSkillAttribute,
  EquippableSkillTargetBehavior,
  EquippableSkillTargetType,
  Guardian,
  WorldLocation,
} from '../interfaces';
import { getEntry } from './content';
import { gainCurrency, updateCurrencyClaims } from './currency';
import { gainDroppableItem, makeDroppableIntoRealItem } from './droppable';
import {
  exploreProgressPercent,
  travelHome,
  updateExploringAndGlobalStatusText,
} from './explore';
import { createGuardianForLocation } from './guardian';
import { allHeroes, heroGainXp } from './hero';
import { notify } from './notify';
import { uuid } from './rng';
import { localStorageSignal } from './signal';
import { gamestate, updateGamestate } from './state-game';
import { claimNode, getWorldNode } from './world';

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

export function getDefaultAffinities(): ElementBlock {
  return {
    Air: 1,
    Earth: 1,
    Fire: 1,
    Water: 1,
  };
}

export function generateCombatForLocation(location: WorldLocation): Combat {
  const heroes: Combatant[] = allHeroes().map((h) => ({
    id: h.id,
    name: h.name,
    isEnemy: false,

    baseStats: h.baseStats,
    totalStats: h.baseStats,
    hp: h.baseStats.Health,
    level: h.level,
    sprite: h.sprite,
    frames: h.frames,
    skillIds: ['Attack'],
    skillRefs: h.skills.filter(Boolean) as EquipmentSkill[],

    affinity: {
      ...getDefaultAffinities(),
    },

    resistance: {
      ...getDefaultAffinities(),
    },
  }));

  const guardians: Combatant[] = location.guardianIds
    .map((g) => getEntry<Guardian>(g)!)
    .filter(Boolean)
    .map((g) => createGuardianForLocation(location, g))
    .map((g) => ({
      id: g.id,
      name: `${g.name} Lv.${location.encounterLevel}`,
      isEnemy: true,

      baseStats: g.stats,
      totalStats: g.stats,
      hp: g.stats.Health,
      level: location.encounterLevel,
      sprite: g.sprite,
      frames: g.frames,
      skillIds: ['Attack', ...g.skillIds],
      skillRefs: [],

      affinity: {
        ...getDefaultAffinities(),
        ...g.affinity,
      },

      resistance: {
        ...getDefaultAffinities(),
        ...g.resistance,
      },
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

export function availableSkillsForCombatant(
  combatant: Combatant,
): EquipmentSkill[] {
  return [
    ...combatant.skillIds.map((s) => getEntry<EquipmentSkill>(s)!),
    ...combatant.skillRefs,
  ];
}

export function orderCombatantsBySpeed(combat: Combat): Combatant[] {
  return sortBy(
    [...combat.guardians, ...combat.heroes],
    (c) => -c.totalStats.Speed,
  );
}

export function filterCombatantTargetListForSkillTechniqueBehavior(
  combatants: Combatant[],
  behavior: EquippableSkillTargetBehavior,
): Combatant[] {
  const behaviors: Record<
    EquippableSkillTargetBehavior,
    (c: Combatant[]) => Combatant[]
  > = {
    Always: (list) => list,
    NotMaxHealth: (list) => list.filter((c) => c.hp < c.totalStats.Health),
    NotZeroHealth: (list) => list.filter((c) => c.hp > 0),
  };

  if (!behaviors[behavior])
    throw new Error(`Invalid target behavior: ${behavior}`);

  return behaviors[behavior](combatants);
}

export function filterCombatantTargetListForSkillTechnique(
  combatants: Combatant[],
  technique: EquipmentSkillDefinitionTechnique,
): Combatant[] {
  return intersection(
    ...technique.targetBehaviors.map((b) =>
      filterCombatantTargetListForSkillTechniqueBehavior(combatants, b),
    ),
  );
}

export function getBaseCombatantTargetListForSkillTechnique(
  combat: Combat,
  combatant: Combatant,
  technique: EquipmentSkillDefinitionTechnique,
): Combatant[] {
  const myType = combatant.isEnemy ? 'guardian' : 'hero';
  const allies = myType === 'guardian' ? combat.guardians : combat.heroes;
  const enemies = myType === 'guardian' ? combat.heroes : combat.guardians;

  const targetTypes: Record<EquippableSkillTargetType, Combatant[]> = {
    All: [...allies, ...enemies],
    Enemies: enemies,
    Allies: allies,
    Self: [combatant],
  };

  if (!targetTypes[technique.targetType])
    throw new Error(`Invalid target type: ${technique.targetType}`);

  return targetTypes[technique.targetType];
}

export function getPossibleCombatantTargetsForSkillTechnique(
  combat: Combat,
  combatant: Combatant,
  skill: EquipmentSkillDefinition,
  tech: EquipmentSkillDefinitionTechnique,
): Combatant[] {
  const baseList = getBaseCombatantTargetListForSkillTechnique(
    combat,
    combatant,
    tech,
  );
  return filterCombatantTargetListForSkillTechnique(baseList, tech);
}

export function getPossibleCombatantTargetsForSkill(
  combat: Combat,
  combatant: Combatant,
  skill: EquipmentSkillDefinition,
): Combatant[] {
  return union(
    skill.techniques.flatMap((t) =>
      getPossibleCombatantTargetsForSkillTechnique(combat, combatant, skill, t),
    ),
  );
}

export function techniqueHasAttribute(
  technique: EquipmentSkillDefinitionTechnique,
  attribute: EquippableSkillAttribute,
): boolean {
  return technique.attributes?.includes(attribute);
}

export function applySkillToTarget(
  combat: Combat,
  combatant: Combatant,
  target: Combatant,
  skill: EquipmentSkill,
  technique: EquipmentSkillDefinitionTechnique,
): void {
  const baseDamage =
    combatant.totalStats.Force * (technique.damageScaling.Force ?? 0) +
    combatant.totalStats.Aura * (technique.damageScaling.Aura ?? 0) +
    combatant.totalStats.Health * (technique.damageScaling.Health ?? 0) +
    combatant.totalStats.Speed * (technique.damageScaling.Speed ?? 0);

  const damage =
    technique.elements.length === 0
      ? baseDamage
      : sum(
          technique.elements.map((el) => baseDamage * combatant.affinity[el]),
        ) / technique.elements.length;

  const baseTargetDefense = target.totalStats.Aura;
  const targetDefense =
    technique.elements.length === 0
      ? baseTargetDefense
      : sum(
          technique.elements.map(
            (el) => baseTargetDefense * target.resistance[el],
          ),
        ) / technique.elements.length;

  let effectiveDamage = damage;

  if (!techniqueHasAttribute(technique, 'AllowNegative')) {
    effectiveDamage = Math.max(0, effectiveDamage);
  }

  if (!techniqueHasAttribute(technique, 'BypassDefense')) {
    effectiveDamage = Math.max(0, effectiveDamage - targetDefense);
  }

  if (techniqueHasAttribute(technique, 'AllowPlink')) {
    effectiveDamage = Math.max(damage > 0 ? 1 : 0, effectiveDamage);
  }

  effectiveDamage = Math.floor(effectiveDamage);

  target.hp = Math.max(0, target.hp - effectiveDamage);

  const templateData = {
    combat,
    combatant,
    target,
    skill,
    technique,
    damage: effectiveDamage,
    absdamage: Math.abs(effectiveDamage),
  };
  const message = Mustache.render(technique.combatMessage, templateData);
  logCombatMessage(combat, message);

  if (isDead(target)) {
    logCombatMessage(combat, `**${target.name}** has been defeated!`);
  }
}

export function combatantTakeTurn(combat: Combat, combatant: Combatant): void {
  if (isDead(combatant)) {
    logCombatMessage(combat, `**${combatant.name}** is dead, skipping turn.`);
    return;
  }

  const skills = availableSkillsForCombatant(combatant).filter(
    (s) => getPossibleCombatantTargetsForSkill(combat, combatant, s).length > 0,
  );
  const chosenSkill = sample(skills);
  if (!chosenSkill) {
    logCombatMessage(
      combat,
      `**${combatant.name}** has no skills available, skipping turn.`,
    );
    return;
  }

  chosenSkill.techniques.forEach((tech) => {
    const targets = sampleSize(
      getPossibleCombatantTargetsForSkillTechnique(
        combat,
        combatant,
        chosenSkill,
        tech,
      ),
      tech.targets,
    );

    targets.forEach((target) => {
      // check for early termination of combat
      if (isCombatOver(combat)) return;

      applySkillToTarget(combat, combatant, target, chosenSkill, tech);
    });
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
      currentNode.encounterLevel * currentNode.guardianIds.length;
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

    gainCurrency('Soul Essence', xpGainedForClaim);
    logCombatMessage(combat, `You gained ${xpGainedForClaim} Soul Essence!`);

    currentNode.claimLootIds.forEach((lootDefId) => {
      const lootDef = getEntry<DroppableEquippable>(lootDefId);
      if (!lootDef) return;

      const created = makeDroppableIntoRealItem(lootDef);
      gainDroppableItem(created);

      logCombatMessage(combat, `Heroes found **${created.name}**!`);
    });

    claimNode(currentNode);
  }

  resetCombat();
  updateCurrencyClaims();
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

  logCombatMessage(combat, '');

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
