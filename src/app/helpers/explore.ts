import { gamestate } from './state-game';

export function isExploring() {
  return gamestate().hero.location.ticksLeft > 0;
}
