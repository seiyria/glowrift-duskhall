import { Component, computed } from '@angular/core';
import {
  gamestate,
  localStorageSignal,
  showInventoryMenu,
  sortedItemList,
} from '../../helpers';
import { EquipmentSlot, EquipmentItem } from '../../interfaces';
import { CardPageComponent } from '../card-page/card-page.component';
import { IconComponent } from '../icon/icon.component';
import { ItemGridComponent } from '../item-grid/item-grid.component';

@Component({
  selector: 'app-panel-inventory',
  imports: [CardPageComponent, IconComponent, ItemGridComponent],
  templateUrl: './panel-inventory.component.html',
  styleUrl: './panel-inventory.component.scss',
})
export class PanelInventoryComponent {
  public currentItemType = localStorageSignal<EquipmentSlot>(
    'inventoryFilter',
    'accessory',
  );

  public readonly allItemTypes: Array<{ name: string; type: EquipmentSlot }> = [
    { name: 'Accessories', type: 'accessory' },
    { name: 'Armor', type: 'armor' },
    { name: 'Trinkets', type: 'trinket' },
    { name: 'Weapons', type: 'weapon' },
  ];

  public itemCounts = computed(() => {
    const items = gamestate().inventory.items;
    const counts: Record<EquipmentSlot, number> = {
      accessory: 0,
      armor: 0,
      trinket: 0,
      weapon: 0,
    };

    items.forEach((item: EquipmentItem) => {
      const itemType = item.__type as EquipmentSlot;
      if (counts[itemType] !== undefined) {
        counts[itemType]++;
      }
    });

    return counts;
  });

  public getItemCountForType(type: EquipmentSlot): number {
    return this.itemCounts()[type];
  }

  public items = computed(() =>
    sortedItemList(
      gamestate().inventory.items.filter(
        (i: EquipmentItem) => i.__type === this.currentItemType(),
      ),
    ),
  );

  closeMenu() {
    showInventoryMenu.set(false);
  }

  changeItemType(type: EquipmentSlot) {
    this.currentItemType.set(type);
  }
}
