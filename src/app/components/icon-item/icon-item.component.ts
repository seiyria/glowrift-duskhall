import { Component, input } from '@angular/core';
import { TippyDirective } from '@ngneat/helipopper';
import { EquipmentItemDefinition } from '../../interfaces';
import { AtlasImageComponent } from '../atlas-image/atlas-image.component';
import { ItemStatsCompareComponent } from '../item-stats-compare/item-stats-compare.component';
import { ItemStatsComponent } from '../item-stats/item-stats.component';

@Component({
  selector: 'app-icon-item',
  imports: [
    AtlasImageComponent,
    TippyDirective,
    ItemStatsComponent,
    ItemStatsCompareComponent,
  ],
  templateUrl: './icon-item.component.html',
  styleUrl: './icon-item.component.scss',
})
export class IconItemComponent {
  public item = input.required<EquipmentItemDefinition>();
  public compareItem = input<EquipmentItemDefinition>();
}
