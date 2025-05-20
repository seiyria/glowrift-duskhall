import { Branded } from './identifiable';
import { WorldNodeType } from './worldconfig';

export type GameId = Branded<string, 'GameId'>;

export type GameElement = 'Fire' | 'Ice' | 'Earth' | 'Air' | 'Neutral';

export interface GameStateMeta {
  version: number;
  isSetup: boolean;
}

export interface GameStateCamera {
  x: number;
  y: number;
}

export interface GameStateWorldNodeElement {
  element: GameElement;
  intensity: number;
}

export interface GameStateWorldNode {
  x: number;
  y: number;
  name: string;
  nodeType?: WorldNodeType;
  elements: GameStateWorldNodeElement[];
  sprite: string;
  objectSprite: string;
}

export interface GameStateWorld {
  width: number;
  height: number;
  nodes: Record<string, GameStateWorldNode>;
}

export interface GameState {
  meta: GameStateMeta;
  gameId: GameId;
  world: GameStateWorld;
  camera: GameStateCamera;
}
