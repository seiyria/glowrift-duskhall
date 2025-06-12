import { Component, input } from '@angular/core';
import { EquipmentItemDefinition, StatBlock } from '../../interfaces';
import { MarkerStatComponent } from '../marker-stat/marker-stat.component';

@Component({
  selector: 'app-item-stats',
  imports: [MarkerStatComponent],
  templateUrl: './item-stats.component.html',
  styleUrl: './item-stats.component.scss',
})
export class ItemStatsComponent {
  public item = input.required<EquipmentItemDefinition>();
  public statDeltas = input<StatBlock>();
}
