import { gamestate, setGameState } from './state-game';

export function isSetup(): boolean {
  const state = gamestate();

  return false;
}

export function finishSetup(): void {
  const state = gamestate();

  setGameState(state);
}
