import { heroGainXp } from './hero';
import { isSetup } from './setup';
import { gamestate, isGameStateReady, updateGamestate } from './state-game';

export function doGameloop(numTicks: number): void {
  if (!isSetup()) return;
  if (!isGameStateReady()) return;

  gamestate().hero.heroes.forEach((hero) => {
    heroGainXp(hero, numTicks);
  });

  updateGamestate((state) => {
    state.meta.numTicks += numTicks;
    return state;
  });
}
