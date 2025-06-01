import { cloneDeep } from 'lodash';
import {
  EquipmentItem,
  EquipmentItemDefinition,
  EquipmentItemId,
  Hero,
} from '../interfaces';
import { getEntriesByType, getEntry } from './content';
import { recalculateStats } from './hero';
import { randomIdentifiableChoice, seededrng, uuid } from './rng';
import { updateGamestate } from './state-game';

export function pickRandomItemDefinition(
  rng = seededrng(uuid()),
): EquipmentItemDefinition {
  const allItems = [
    ...getEntriesByType<EquipmentItemDefinition>('accessory'),
    ...getEntriesByType<EquipmentItemDefinition>('armor'),
    ...getEntriesByType<EquipmentItemDefinition>('trinket'),
    ...getEntriesByType<EquipmentItemDefinition>('weapon'),
  ];

  const chosenItem = randomIdentifiableChoice<EquipmentItemDefinition>(
    allItems,
    rng,
  );
  if (!chosenItem) throw new Error('Could not generate an item.');

  const chosenItemDefinition = getEntry<EquipmentItemDefinition>(chosenItem);
  if (!chosenItemDefinition) throw new Error('Could not generate an item.');

  return cloneDeep(chosenItemDefinition);
}

export function createItem(def: EquipmentItemDefinition): EquipmentItem {
  const defClone = cloneDeep(def);
  delete defClone.canBeModified;

  return {
    ...defClone,
    id: `${defClone.id}|${uuid()}` as EquipmentItemId,
    mods: {},
  };
}

export function addItemToInventory(item: EquipmentItem): void {
  updateGamestate((state) => {
    state.inventory.items = [...state.inventory.items, item];
    return state;
  });
}

export function equipItem(hero: Hero, item: EquipmentItem): void {
  recalculateStats(hero);
}

export function unequipItem(hero: Hero, item: EquipmentItem): void {
  recalculateStats(hero);
}
