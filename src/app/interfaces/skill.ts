import { DroppableEquippable } from './droppable';
import { GameElement } from './element';
import { Branded } from './identifiable';
import { StatBlock } from './stat';

export type EquippableSkillTargetType = 'Allies' | 'Enemies' | 'Self' | 'All';

export type EquippableSkillId = Branded<string, 'EquippableSkillId'>;

export type SkillModifiable = {
  damageScaling: StatBlock;
};

export type EquipmentSkillDefinition = DroppableEquippable &
  SkillModifiable & {
    __type: 'skill';
    id: EquippableSkillId;

    targets: number;
    targetType: EquippableSkillTargetType;
    damageScaling: StatBlock;
    elements?: [GameElement];
  };

export type EquipmentSkill = EquipmentSkillDefinition & {
  mods: Partial<SkillModifiable>;
};
