import { Component, computed, signal } from '@angular/core';
import { TippyDirective } from '@ngneat/helipopper';
import { gamestate, setHeroRiskTolerance, showHeroesMenu } from '../../helpers';
import { HeroRiskTolerance } from '../../interfaces';
import { AtlasAnimationComponent } from '../atlas-animation/atlas-animation.component';
import { CardPageComponent } from '../card-page/card-page.component';
import { IconComponent } from '../icon/icon.component';
import { PanelHeroesStatsComponent } from '../panel-heroes-stats/panel-heroes-stats.component';

@Component({
  selector: 'app-panel-heroes',
  imports: [
    CardPageComponent,
    IconComponent,
    AtlasAnimationComponent,
    PanelHeroesStatsComponent,
    TippyDirective,
  ],
  templateUrl: './panel-heroes.component.html',
  styleUrl: './panel-heroes.component.css',
})
export class PanelHeroesComponent {
  public allHeroes = computed(() => gamestate().hero.heroes);

  public activeHeroIndex = signal<number>(0);
  public activeHero = computed(() => this.allHeroes()[this.activeHeroIndex()]);

  public currentRiskTolerance = computed(() => gamestate().hero.riskTolerance);

  closeMenu() {
    showHeroesMenu.set(false);
  }

  changeRiskTolerance(risk: HeroRiskTolerance) {
    setHeroRiskTolerance(risk);
  }
}
