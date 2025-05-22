import { Component, computed, signal } from '@angular/core';
import { gamestate, showHeroesMenu } from '../../helpers';
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
  ],
  templateUrl: './panel-heroes.component.html',
  styleUrl: './panel-heroes.component.css',
})
export class PanelHeroesComponent {
  public allHeroes = computed(() => gamestate().hero.heroes);

  public activeHeroIndex = signal<number>(0);
  public activeHero = computed(() => this.allHeroes()[this.activeHeroIndex()]);

  closeMenu() {
    showHeroesMenu.set(false);
  }
}
