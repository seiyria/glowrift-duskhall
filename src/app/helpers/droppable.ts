import {
  DroppableEquippable,
  EquipmentItem,
  EquipmentItemDefinition,
  EquipmentSkill,
  EquipmentSkillDefinition,
} from '../interfaces';
import { createItem } from './creator-equipment';
import { createSkill } from './creator-skill';
import { addItemToInventory } from './inventory-equipment';
import { addSkillToInventory } from './inventory-skill';

export function cleanupDroppableDefinition(
  droppable: DroppableEquippable,
): DroppableEquippable {
  delete droppable.preventModification;
  delete droppable.preventDrop;
  return droppable;
}

export function makeDroppableIntoRealItem(
  droppable: DroppableEquippable,
): DroppableEquippable {
  switch (droppable.__type) {
    case 'skill':
      return createSkill(droppable as EquipmentSkillDefinition);
    case 'accessory':
    case 'armor':
    case 'trinket':
    case 'weapon':
      return createItem(droppable as EquipmentItemDefinition);

    default:
      throw new Error(
        `Could not create a real item with type: ${droppable.__type}`,
      );
  }
}

export function gainDroppableItem(droppable: DroppableEquippable): void {
  switch (droppable.__type) {
    case 'skill':
      addSkillToInventory(droppable as EquipmentSkill);
      return;
    case 'accessory':
    case 'armor':
    case 'trinket':
    case 'weapon':
      addItemToInventory(droppable as EquipmentItem);
      return;

    default:
      throw new Error(
        `Could not handle adding a real item with type: ${droppable.__type}`,
      );
  }
}
