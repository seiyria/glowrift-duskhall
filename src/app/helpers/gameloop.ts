import { WritableSignal } from '@angular/core';
import { heroGainXp } from './hero';
import { isSetup } from './setup';
import { localStorageSignal } from './signal';
import { gamestate, isGameStateReady, updateGamestate } from './state-game';

export const isGameloopPaused: WritableSignal<boolean> = localStorageSignal(
  'paused',
  false,
);

export function doGameloop(numTicks: number): void {
  if (!isSetup()) return;
  if (!isGameStateReady()) return;
  if (isGameloopPaused()) return;

  gamestate().hero.heroes.forEach((hero) => {
    heroGainXp(hero, numTicks);
  });

  updateGamestate((state) => {
    state.meta.numTicks += numTicks;
    return state;
  });
}
