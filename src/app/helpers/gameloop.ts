import { autoTravelGameloop } from './gameloop-autotravel';
import { currencyGameloop } from './gameloop-currency';
import { exploreGameloop } from './gameloop-explore';
import { townGameloop } from './gameloop-town';
import { travelGameloop } from './gameloop-travel';
import { isSetup } from './setup';
import { localStorageSignal } from './signal';
import { isGameStateReady, updateGamestate } from './state-game';

export const isGameloopPaused = localStorageSignal<boolean>('paused', false);

export function doGameloop(numTicks: number): void {
  if (!isSetup()) return;
  if (!isGameStateReady()) return;
  if (isGameloopPaused()) return;

  autoTravelGameloop();
  currencyGameloop(numTicks);
  townGameloop(numTicks);
  travelGameloop(numTicks);
  exploreGameloop(numTicks);

  updateGamestate((state) => {
    state.meta.numTicks += numTicks;
    return state;
  });
}
