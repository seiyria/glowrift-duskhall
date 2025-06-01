import { cloneDeep, sample } from 'lodash';
import { EquipmentItem, Hero } from '../interfaces';
import { getEntriesByType } from './content';
import { recalculateStats } from './hero';

export function generateRandomItems(): EquipmentItem {
  const allItems = [
    ...getEntriesByType<EquipmentItem>('accessory'),
    ...getEntriesByType<EquipmentItem>('armor'),
    ...getEntriesByType<EquipmentItem>('trinket'),
    ...getEntriesByType<EquipmentItem>('weapon'),
  ];

  const chosenItem = sample(allItems);
  if (!chosenItem) throw new Error('Could not generate an item.');

  return cloneDeep(chosenItem);
}

export function addItemToInventory(item: EquipmentItem): void {}

export function equipItem(hero: Hero, item: EquipmentItem): void {
  recalculateStats(hero);
}

export function unequipItem(hero: Hero, item: EquipmentItem): void {
  recalculateStats(hero);
}
