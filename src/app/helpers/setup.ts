import { gamestate, setGameState } from './state-game';

export function isSetup(): boolean {
  const state = gamestate();
  return state.meta.isSetup;
}

export function finishSetup(): void {
  const state = gamestate();
  state.meta.isSetup = true;
  setGameState(state);
}
