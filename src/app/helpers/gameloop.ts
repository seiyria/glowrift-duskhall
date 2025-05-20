import { isSetup } from './setup';
import { blankGameState, isGameStateReady, setGameState } from './state-game';

export function isPlayingGame(): boolean {
  return window.location.href.includes('/game');
}

export function isGameOver(): boolean {
  return window.location.href.includes('/over');
}

export function doGameOver(): void {
  setGameState(blankGameState());
}

export function doGameloop(numTicks: number): void {
  if (!isSetup()) return;
  if (!isPlayingGame()) return;
  if (!isGameStateReady()) return;
  if (isGameOver()) return;
}
