import { signal } from '@angular/core';
import { gamestate } from './state-game';

export const exploreProgressText = signal<string>('');
export const exploreProgressPercent = signal<number>(0);

export function isExploring() {
  return gamestate().hero.location.ticksLeft > 0;
}
