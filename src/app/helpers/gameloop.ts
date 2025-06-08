import { autoTravelGameloop } from './gameloop-autotravel';
import { currencyGameloop } from './gameloop-currency';
import { exploreGameloop } from './gameloop-explore';
import { gameloopTimers } from './gameloop-timers';
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
  gameloopTimers(numTicks);

  updateGamestate((state) => {
    state.actionClock.numTicks += numTicks;
    return state;
  });
}
