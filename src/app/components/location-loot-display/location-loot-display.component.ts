import { Component, input } from '@angular/core';
import { TippyDirective } from '@ngneat/helipopper';
import { EquipmentItemDefinition } from '../../interfaces';
import { IconItemComponent } from '../icon-item/icon-item.component';

@Component({
  selector: 'app-location-loot-display',
  imports: [IconItemComponent, TippyDirective],
  templateUrl: './location-loot-display.component.html',
  styleUrl: './location-loot-display.component.scss',
})
export class LocationLootDisplayComponent {
  public loot = input.required<EquipmentItemDefinition>();
}
