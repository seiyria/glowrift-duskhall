import { Component, input, output } from '@angular/core';

import { DecimalPipe } from '@angular/common';
import { TippyDirective } from '@ngneat/helipopper';
import { itemSalvage, itemSalvageValue } from '../../helpers';
import { EquipmentItem } from '../../interfaces';
import { IconItemComponent } from '../icon-item/icon-item.component';

export type ItemAction = 'Salvage';

@Component({
  selector: 'app-item-grid',
  imports: [IconItemComponent, TippyDirective, DecimalPipe],
  templateUrl: './item-grid.component.html',
  styleUrl: './item-grid.component.scss',
})
export class ItemGridComponent {
  public items = input.required<EquipmentItem[]>();
  public clickableItems = input<boolean>();

  public allowedActions = input<ItemAction[]>([]);

  public itemClicked = output<EquipmentItem>();

  salvageValue(item: EquipmentItem) {
    return itemSalvageValue(item);
  }

  salvageItem(item: EquipmentItem) {
    itemSalvage(item);
  }
}
