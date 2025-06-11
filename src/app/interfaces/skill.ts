import { DroppableEquippable } from './droppable';
import { GameElement } from './element';
import { Branded } from './identifiable';
import { StatBlock } from './stat';

export type EquippableSkillTargetType = 'Allies' | 'Enemies' | 'Self' | 'All';

export type EquippableSkillId = Branded<string, 'EquippableSkillId'>;

export type EquipmentSkillDefinitionTechniqueModifiable = {
  techniques: EquipmentSkillDefinitionTechnique[];
};

export type EquipmentSkillDefinitionTechnique = {
  targets: number;
  targetType: EquippableSkillTargetType;
  damageScaling: StatBlock;
  elements: GameElement[];
};

export type EquipmentSkillDefinition = DroppableEquippable &
  EquipmentSkillDefinitionTechniqueModifiable & {
    __type: 'skill';
    id: EquippableSkillId;

    combatMessage: string;
  };

export type EquipmentSkill = EquipmentSkillDefinition & {
  mods: Partial<EquipmentSkillDefinitionTechniqueModifiable>;
};
