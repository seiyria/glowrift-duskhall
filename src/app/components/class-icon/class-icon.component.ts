import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ALL_ICONS } from '../../helpers';
import { HeroType } from '../../interfaces';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-class-icon',
  imports: [CommonModule, IconComponent],
  templateUrl: './class-icon.component.html',
  styleUrl: './class-icon.component.scss',
})
export class ClassIconComponent {
  public className = input.required<HeroType | 'Hybrid'>();

  public readonly iconsPerClass: Record<
    HeroType | 'Hybrid',
    keyof typeof ALL_ICONS
  > = {
    Defender: 'gameDragonShield',
    Attacker: 'gameCrossedSabres',
    Caster: 'gameLunarWand',
    Healer: 'gameCaduceus',
    Ranger: 'gameInterleavedArrows',
    Hybrid: 'gameDaggerRose',
  } as const;

  public iconName = computed(() => this.iconsPerClass[this.className()]);
}
