import { Component, input } from '@angular/core';
import { EquipmentItemDefinition } from '../../interfaces';
import { AtlasImageComponent } from '../atlas-image/atlas-image.component';

@Component({
  selector: 'app-icon-item',
  imports: [AtlasImageComponent],
  templateUrl: './icon-item.component.html',
  styleUrl: './icon-item.component.scss',
})
export class IconItemComponent {
  public item = input.required<EquipmentItemDefinition>();
}
