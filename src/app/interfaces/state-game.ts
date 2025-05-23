import { Hero } from './hero';
import { Branded } from './identifiable';
import { WorldPosition } from './world';
import { WorldNodeType } from './worldconfig';

export type GameId = Branded<string, 'GameId'>;

export type GameElement = 'Fire' | 'Ice' | 'Earth' | 'Air' | 'Neutral';

export interface GameStateMeta {
  version: number;
  isSetup: boolean;
  isPaused: boolean;
  createdAt: number;
  numTicks: number;
}

export type GameStateCamera = WorldPosition;

export interface GameStateWorldNodeElement {
  element: GameElement;
  intensity: number;
}

export type GameStateWorldNode = WorldPosition & {
  name: string;
  nodeType?: WorldNodeType;
  elements: GameStateWorldNodeElement[];
  sprite: string;
  objectSprite: string;

  currentlyClaimed: boolean;
  clearCount: number;
  encounterLevel: number;
};

export interface GameStateWorld {
  width: number;
  height: number;
  nodes: Record<string, GameStateWorldNode>;
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
