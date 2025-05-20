import { Branded } from './identifiable';

export type GameId = Branded<string, 'GameId'>;

export interface GameStateMeta {
  version: number;
  gameId: GameId;
}

export interface GameState {
  meta: GameStateMeta;
}
