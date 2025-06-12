import { Component, computed, input, Signal } from '@angular/core';
import { EquipmentItemDefinition, StatBlock } from '../../interfaces';
import { ItemStatsComponent } from '../item-stats/item-stats.component';

@Component({
  selector: 'app-item-stats-compare',
  imports: [ItemStatsComponent],
  templateUrl: './item-stats-compare.component.html',
  styleUrl: './item-stats-compare.component.scss',
})
export class ItemStatsCompareComponent {
  public item = input.required<EquipmentItemDefinition>();
  public compareWith = input.required<EquipmentItemDefinition>();

  public leftSideDeltas: Signal<StatBlock> = computed(() => ({
    Aura:
      (this.item().baseStats.Aura ?? 0) -
      (this.compareWith().baseStats.Aura ?? 0),
    Force:
      (this.item().baseStats.Force ?? 0) -
      (this.compareWith().baseStats.Force ?? 0),
    Health:
      (this.item().baseStats.Health ?? 0) -
      (this.compareWith().baseStats.Health ?? 0),
    Speed:
      (this.item().baseStats.Speed ?? 0) -
      (this.compareWith().baseStats.Speed ?? 0),
  }));

  public rightSideDeltas: Signal<StatBlock> = computed(() => ({
    Aura:
      (this.compareWith().baseStats.Aura ?? 0) -
      (this.item().baseStats.Aura ?? 0),
    Force:
      (this.compareWith().baseStats.Force ?? 0) -
      (this.item().baseStats.Force ?? 0),
    Health:
      (this.compareWith().baseStats.Health ?? 0) -
      (this.item().baseStats.Health ?? 0),
    Speed:
      (this.compareWith().baseStats.Speed ?? 0) -
      (this.item().baseStats.Speed ?? 0),
  }));
}
