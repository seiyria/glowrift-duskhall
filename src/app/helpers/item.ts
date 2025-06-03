import { sortBy } from 'lodash';
import { EquipmentItem } from '../interfaces';

export function sortedItemList(items: EquipmentItem[]): EquipmentItem[] {
  return sortBy(items, [
    (i) => {
      switch (i.rarity) {
        case 'common':
          return 0;
        case 'uncommon':
          return -1;
        case 'rare':
          return -2;
        case 'mystical':
          return -3;
        case 'legendary':
          return -4;
        case 'unique':
          return -5;
        default:
          return 0;
      }
    },
    (i) => -i.dropLevel,
  ]);
}
