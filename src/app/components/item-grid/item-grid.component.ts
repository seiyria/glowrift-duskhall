import { Component, input } from '@angular/core';
import { TippyDirective } from '@ngneat/helipopper';
import { EquipmentItem } from '../../interfaces';
import { IconItemComponent } from '../icon-item/icon-item.component';
import { MarkerStatComponent } from '../marker-stat/marker-stat.component';

@Component({
  selector: 'app-item-grid',
  imports: [IconItemComponent, TippyDirective, MarkerStatComponent],
  templateUrl: './item-grid.component.html',
  styleUrl: './item-grid.component.scss',
})
export class ItemGridComponent {
  public items = input.required<EquipmentItem[]>();
}
