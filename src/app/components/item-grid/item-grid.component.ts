import { Component, input, output } from '@angular/core';
import { EquipmentItem } from '../../interfaces';
import { IconItemComponent } from '../icon-item/icon-item.component';

@Component({
  selector: 'app-item-grid',
  imports: [IconItemComponent],
  templateUrl: './item-grid.component.html',
  styleUrl: './item-grid.component.scss',
})
export class ItemGridComponent {
  public items = input.required<EquipmentItem[]>();
  public clickableItems = input<boolean>();

  public itemClicked = output<EquipmentItem>();
}
