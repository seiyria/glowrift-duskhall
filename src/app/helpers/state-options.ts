import { Signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { GameOptions } from '../interfaces';
import { localStorageSignal } from './signal';

export function defaultOptions(): GameOptions {
  return {
    showDebug: !environment.production,
    debugConsoleLogStateUpdates: false,
    debugMapNodePositions: false,

    uiTheme: 'dark',

    volume: 0.5,
  };
}

const _options = localStorageSignal<GameOptions>('options', defaultOptions());
export const options: Signal<GameOptions> = _options.asReadonly();

export function toggleDebugOn() {
  setOption('showDebug', true);
}

export function setOptions(options: GameOptions) {
  _options.set(options);
}

export function setOption<T extends keyof GameOptions>(
  option: T,
  value: GameOptions[T],
): void {
  _options.update((state) => ({
    ...state,
    [option]: value,
  }));
}

export function getOption<T extends keyof GameOptions>(
  option: T,
): GameOptions[T] {
  return options()[option];
}
