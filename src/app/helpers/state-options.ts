import { signal, Signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { GameOptions } from '../interfaces';

export function defaultOptions(): GameOptions {
  return {
    showDebug: !environment.production,
    debugConsoleLogStateUpdates: false,

    uiTheme: 'dark',

    volume: 0.5,
  };
}

const _options: WritableSignal<GameOptions> = signal(defaultOptions());
export const options: Signal<GameOptions> = _options.asReadonly();

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

export function toggleDebugOn() {
  setOption('showDebug', true);
}

export function getOption<T extends keyof GameOptions>(
  option: T,
): GameOptions[T] {
  return options()[option];
}
