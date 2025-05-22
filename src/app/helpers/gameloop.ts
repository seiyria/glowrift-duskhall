import { isSetup } from './setup';
import { isGameStateReady, updateGamestate } from './state-game';

export function doGameloop(numTicks: number): void {
  if (!isSetup()) return;
  if (!isGameStateReady()) return;

  updateGamestate((state) => {
    state.meta.numTicks += numTicks;
    return state;
  });
}
