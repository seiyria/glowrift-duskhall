import { Hero } from './hero';
import { Branded } from './identifiable';
import { WorldLocation, WorldPosition } from './world';

export type GameId = Branded<string, 'GameId'>;

export interface GameStateMeta {
  version: number;
  isSetup: boolean;
  isPaused: boolean;
  createdAt: number;
  numTicks: number;
}

export type GameStateCamera = WorldPosition;

export interface GameStateWorld {
  width: number;
  height: number;
  nodes: Record<string, WorldLocation>;
}

export interface GameStateHeroes {
  heroes: Hero[];
  position: WorldPosition;
}

export interface GameState {
  meta: GameStateMeta;
  gameId: GameId;
  world: GameStateWorld;
  camera: GameStateCamera;
  hero: GameStateHeroes;
}
