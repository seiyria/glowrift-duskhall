import { EquipmentItem } from '../interfaces';
import { gainCurrency } from './currency';
import { removeItemFromInventory } from './inventory-equipment';
import { notifySuccess } from './notify';

export function itemSalvageValue(item: EquipmentItem): number {
  return (
    (item.baseStats.Aura ?? 0) * 4 +
    (item.baseStats.Force ?? 0) * 6 +
    (item.baseStats.Health ?? 0) * 2 +
    (item.baseStats.Speed ?? 0) * 10
  );
}

export function itemSalvage(item: EquipmentItem): void {
  const manaGained = itemSalvageValue(item);

  removeItemFromInventory(item);
  gainCurrency('Mana', manaGained);

  notifySuccess(`Salvaged ${item.name} for ${manaGained} mana!`);
}
