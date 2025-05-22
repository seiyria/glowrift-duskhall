import { effect, inject, Injectable, signal } from '@angular/core';
import { interval } from 'rxjs';
import {
  gamestate,
  getOption,
  isGameStateReady,
  migrateGameState,
  migrateOptionsState,
  spriteIterationCount,
} from '../helpers';
import { ContentService } from './content.service';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class GamestateService {
  private logger = inject(LoggerService);
  private contentService = inject(ContentService);

  public hasLoaded = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (!this.contentService.hasLoaded() || this.hasLoaded()) return;
      this.logger.info('GameState', 'Migrating gamestate...');

      migrateGameState();
      migrateOptionsState();

      this.logger.info('GameState', 'Gamestate migrated & loaded.');
      this.hasLoaded.set(true);
      isGameStateReady.set(true);
    });

    effect(() => {
      if (!this.hasLoaded()) return;

      const state = gamestate();

      if (getOption('debugConsoleLogStateUpdates')) {
        this.logger.debug('GameState Update', state);
      }
    });
  }

  async init() {
    interval(100).subscribe(() => {
      spriteIterationCount.set(spriteIterationCount() + 1);
    });
  }
}
