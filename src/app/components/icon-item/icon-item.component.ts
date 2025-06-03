import { Component, input } from '@angular/core';
import { TippyDirective } from '@ngneat/helipopper';
import { EquipmentItemDefinition } from '../../interfaces';
import { AtlasImageComponent } from '../atlas-image/atlas-image.component';
import { MarkerStatComponent } from '../marker-stat/marker-stat.component';

@Component({
  selector: 'app-icon-item',
  imports: [AtlasImageComponent, MarkerStatComponent, TippyDirective],
  templateUrl: './icon-item.component.html',
  styleUrl: './icon-item.component.scss',
})
export class IconItemComponent {
  public item = input.required<EquipmentItemDefinition>();
}
