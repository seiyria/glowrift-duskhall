import { Component, input } from '@angular/core';
import { TippyDirective } from '@ngneat/helipopper';
import { EquipmentSkillDefinition } from '../../interfaces';
import { AtlasAnimationComponent } from '../atlas-animation/atlas-animation.component';

@Component({
  selector: 'app-icon-skill',
  imports: [AtlasAnimationComponent, TippyDirective],
  templateUrl: './icon-skill.component.html',
  styleUrl: './icon-skill.component.scss',
})
export class IconSkillComponent {
  public skill = input.required<EquipmentSkillDefinition>();
}
