import { intersection, union } from 'lodash';
import {
  Combat,
  Combatant,
  EquipmentSkill,
  EquipmentSkillDefinition,
  EquipmentSkillDefinitionTechnique,
  EquippableSkillTargetBehavior,
  EquippableSkillTargetType,
} from '../interfaces';
import { getEntry } from './content';

export function availableSkillsForCombatant(
  combatant: Combatant,
): EquipmentSkill[] {
  return [
    ...combatant.skillIds.map((s) => getEntry<EquipmentSkill>(s)!),
    ...combatant.skillRefs,
  ];
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
