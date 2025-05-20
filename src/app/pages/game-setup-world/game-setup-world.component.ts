import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsClickDirective } from '../../directives/analytics-click.directive';
import {
  finishSetup,
  generateWorld,
  getEntriesByType,
  resetWorld,
  setCameraPosition,
  setDiscordStatus,
  setWorld,
} from '../../helpers';
import { WorldConfig } from '../../interfaces';

@Component({
  selector: 'app-game-setup-world',
  imports: [AnalyticsClickDirective],
  templateUrl: './game-setup-world.component.html',
  styleUrl: './game-setup-world.component.scss',
})
export class GameSetupWorldComponent implements OnInit {
  private router = inject(Router);

  public allWorldSizes = getEntriesByType<WorldConfig>('worldconfig');

  public isGeneratingWorld = signal<boolean>(false);

  ngOnInit() {
    setDiscordStatus({
      state: 'Starting a new game...',
    });
  }

  public createWorld(config: WorldConfig): void {
    this.isGeneratingWorld.set(true);

    resetWorld();

    const world = generateWorld(config);

    setWorld(world);
    setCameraPosition(config.width / 2, config.height / 2);
    finishSetup();

    this.router.navigate(['/game']);

    this.isGeneratingWorld.set(false);
  }
}
