import { Branded, Content } from './identifiable';
import { StatBlock } from './stat';

export type EquipmentSlot = 'accessory' | 'armor' | 'trinket' | 'weapon';

export type EquipmentRarity =
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'mystical'
  | 'legendary'
  | 'unique';

export type EquipmentItemId = Branded<string, 'EquipmentItemId'>;

export type EquipmentBlock = Record<
  EquipmentSlot,
  EquipmentItemDefinition | undefined
>;

export type EquipmentModifiable = {
  baseStats: StatBlock;
};

export type EquipmentItemDefinition = Content &
  EquipmentModifiable & {
    __type: EquipmentSlot;
    id: EquipmentItemId;
    sprite: string;

    canBeModified?: boolean;
    rarity: EquipmentRarity;
    dropLevel: number;
  };

export type EquipmentItem = EquipmentItemDefinition & {
  mods: Partial<EquipmentModifiable>;
};
