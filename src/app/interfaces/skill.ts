import { DroppableEquippable } from './droppable';
import { GameElement } from './element';
import { Branded } from './identifiable';
import { StatBlock } from './stat';

export type EquippableSkillTargetBehavior =
  | 'Always'
  | 'NotZeroHealth'
  | 'NotMaxHealth';

export type EquippableSkillAttribute =
  | 'BypassDefense'
  | 'AllowNegative'
  | 'AllowPlink';

export type EquippableSkillTargetType = 'Allies' | 'Enemies' | 'Self' | 'All';

export type EquippableSkillId = Branded<string, 'EquippableSkillId'>;

export type EquipmentSkillDefinitionTechniqueModifiable = {
  techniques: EquipmentSkillDefinitionTechnique[];
};

export type EquipmentSkillDefinitionTechnique = {
  targets: number;
  targetType: EquippableSkillTargetType;
  targetBehaviors: EquippableSkillTargetBehavior[];
  damageScaling: StatBlock;
  elements: GameElement[];
  attributes: EquippableSkillAttribute[];

  combatMessage: string;
};

export type EquipmentSkillDefinition = DroppableEquippable &
  EquipmentSkillDefinitionTechniqueModifiable & {
    __type: 'skill';
    id: EquippableSkillId;
  };

export type EquipmentSkill = EquipmentSkillDefinition & {
  mods: Partial<EquipmentSkillDefinitionTechniqueModifiable>;
};
