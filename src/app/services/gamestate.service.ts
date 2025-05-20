import { effect, inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import {
  gamestate,
  getOption,
  isGameStateReady,
  migrateGameState,
  migrateOptionsState,
  options,
  setGameState,
  setOptions,
} from '../helpers';
import { GameOptions, GameState } from '../interfaces';
import { ContentService } from './content.service';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class GamestateService {
  private localStorage = inject(LocalStorageService);
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

      this.saveGamestate(state);
    });

    effect(() => {
      if (!this.hasLoaded()) return;

      const optionsState = options();
      this.saveOptions(optionsState);
    });
  }

  async init() {
    this.load();
  }

  load() {
    const state = this.localStorage.retrieve('gamestate') as GameState;
    if (state) {
      setGameState(state);
    }

    const options = this.localStorage.retrieve('options') as GameOptions;
    if (options) {
      setOptions(options);
    }
  }

  saveGamestate(saveState: GameState) {
    this.localStorage.store('gamestate', saveState);
  }

  saveOptions(optionsState: GameOptions) {
    this.localStorage.store('options', optionsState);
  }
}
