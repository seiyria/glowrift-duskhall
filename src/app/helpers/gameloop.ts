import { isSetup } from './setup';
import { localStorageSignal } from './signal';
import { gamestate, isGameStateReady, updateGamestate } from './state-game';

export const isGameloopPaused = localStorageSignal<boolean>('paused', false);

export function travelGameloop(numTicks: number): void {
  const travel = gamestate().hero.travel;
  if (travel.ticksLeft > 0) {
    updateGamestate((state) => {
      state.hero.travel.ticksLeft -= numTicks;

      if (state.hero.travel.ticksLeft <= 0) {
        state.hero.position.nodeId = travel.nodeId;
        state.hero.position.x = travel.x;
        state.hero.position.y = travel.y;

        state.hero.travel.nodeId = '';
        state.hero.travel.ticksLeft = 0;
        state.hero.travel.x = 0;
        state.hero.travel.y = 0;
      }
      return state;
    });
  }
}

export function doGameloop(numTicks: number): void {
  if (!isSetup()) return;
  if (!isGameStateReady()) return;
  if (isGameloopPaused()) return;

  travelGameloop(numTicks);

  updateGamestate((state) => {
    state.meta.numTicks += numTicks;
    return state;
  });
}
