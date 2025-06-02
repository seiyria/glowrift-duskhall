import { Component, computed } from '@angular/core';
import { sortBy } from 'lodash';
import {
  gamestate,
  localStorageSignal,
  showInventoryMenu,
} from '../../helpers';
import { EquipmentSlot } from '../../interfaces';
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

  public items = computed(() =>
    sortBy(
      gamestate().inventory.items.filter(
        (i) => i.__type === this.currentItemType(),
      ),
      [
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
      ],
    ),
  );

  closeMenu() {
    showInventoryMenu.set(false);
  }

  changeItemType(type: EquipmentSlot) {
    this.currentItemType.set(type);
  }
}
