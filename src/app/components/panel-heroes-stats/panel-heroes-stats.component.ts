import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { heroStats, heroXpRequiredForLevelUp } from '../../helpers';
import { Hero } from '../../interfaces';
import { HeroStatComponent } from '../hero-stat/hero-stat.component';

@Component({
  selector: 'app-panel-heroes-stats',
  imports: [CommonModule, HeroStatComponent],
  templateUrl: './panel-heroes-stats.component.html',
  styleUrl: './panel-heroes-stats.component.scss',
})
export class PanelHeroesStatsComponent {
  public hero = input.required<Hero>();

  public heroStats = computed(() => heroStats(this.hero()));
  public maxXp = computed(() => heroXpRequiredForLevelUp(this.hero().level));
}
