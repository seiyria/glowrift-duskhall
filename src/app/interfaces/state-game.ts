import { Combat } from './combat';
import { EquipmentItem } from './equipment';
import { Hero, HeroRiskTolerance } from './hero';
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

export type GameStateHeroesPosition = WorldPosition & { nodeId: string };

export interface GameStateWorld {
  width: number;
  height: number;
  nodes: Record<string, WorldLocation>;
  homeBase: WorldPosition;
}

export type GameStateHeroesTraveling = WorldPosition & {
  nodeId: string;
  ticksLeft: number;
};

export type GameStateHeroesLocation = {
  ticksTotal: number;
  ticksLeft: number;
};

export interface GameStateHeroes {
  riskTolerance: HeroRiskTolerance;
  heroes: Hero[];
  position: GameStateHeroesPosition;
  travel: GameStateHeroesTraveling;
  location: GameStateHeroesLocation;
  respawnTicks: number;
  combat?: Combat;
}

export interface GameStateInventory {
  items: EquipmentItem[];
}

export interface GameState {
  meta: GameStateMeta;
  gameId: GameId;
  world: GameStateWorld;
  camera: GameStateCamera;
  hero: GameStateHeroes;
  inventory: GameStateInventory;
}
