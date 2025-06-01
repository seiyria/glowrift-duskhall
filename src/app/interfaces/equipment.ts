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

export type EquipmentBlock = Record<EquipmentSlot, EquipmentItem | undefined>;

export interface EquipmentItem extends Content {
  id: EquipmentItemId;

  canBeModified: boolean;
  rarity: EquipmentRarity;
  dropLevel: number;
  baseStats: StatBlock;
}
