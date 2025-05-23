import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ALL_ICONS } from '../../helpers';
import { GameStat } from '../../interfaces';
import { IconComponent } from '../icon/icon.component';

const icons: Record<GameStat, keyof typeof ALL_ICONS> = {
  aura: 'gameVibratingShield',
  force: 'gameGooeyImpact',
  health: 'gameGlassHeart',
  speed: 'gameClockwork',
};

@Component({
  selector: 'app-hero-stat',
  imports: [IconComponent, DecimalPipe, TitleCasePipe],
  templateUrl: './hero-stat.component.html',
  styleUrl: './hero-stat.component.scss',
})
export class HeroStatComponent {
  public stat = input.required<GameStat>();
  public value = input.required<number>();

  public icon = computed(() => icons[this.stat()]);
}
