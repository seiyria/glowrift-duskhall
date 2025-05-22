import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AtlasAnimationComponent } from '../../components/atlas-animation/atlas-animation.component';
import { AnalyticsClickDirective } from '../../directives/analytics-click.directive';
import {
  finishSetup,
  gamestate,
  generateWorld,
  getEntriesByType,
  pickSpriteForHeroName,
  resetGameState,
  setCameraPosition,
  setDiscordStatus,
  setHeroPosition,
  setWorld,
  updateHeroData,
} from '../../helpers';
import { WorldConfig } from '../../interfaces';

@Component({
  selector: 'app-game-setup-world',
  imports: [
    AnalyticsClickDirective,
    SweetAlert2Module,
    AtlasAnimationComponent,
  ],
  templateUrl: './game-setup-world.component.html',
  styleUrl: './game-setup-world.component.scss',
})
export class GameSetupWorldComponent implements OnInit {
  private router = inject(Router);

  public readonly allWorldSizes = getEntriesByType<WorldConfig>('worldconfig');

  public heroNames = [
    signal<string>('Ignatius'),
    signal<string>('Aquara'),
    signal<string>('Terrus'),
    signal<string>('Zephyra'),
  ];

  public readonly heroSprites = [
    computed(() => pickSpriteForHeroName(this.heroNames[0]())),
    computed(() => pickSpriteForHeroName(this.heroNames[1]())),
    computed(() => pickSpriteForHeroName(this.heroNames[2]())),
    computed(() => pickSpriteForHeroName(this.heroNames[3]())),
  ];

  public isGeneratingWorld = signal<boolean>(false);

  ngOnInit() {
    setDiscordStatus({
      state: 'Starting a new game...',
    });
  }

  public createWorld(config: WorldConfig): void {
    this.isGeneratingWorld.set(true);

    resetGameState();

    for (let h = 0; h < 4; h++) {
      const heroId = gamestate().hero.heroes[h].id;
      updateHeroData(heroId, {
        name: this.heroNames[h](),
        sprite: this.heroSprites[h](),
      });
    }

    const world = generateWorld(config);

    setWorld(world);
    setCameraPosition(config.width / 2, config.height / 2);
    setHeroPosition(config.width / 2, config.height / 2);
    finishSetup();

    this.router.navigate(['/game']);

    this.isGeneratingWorld.set(false);
  }

  public renameHero(index: number, name: string): void {
    this.heroNames[index].set(name);
  }
}
