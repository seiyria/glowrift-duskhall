import { Signal, signal } from '@angular/core';
import { cloneDeep } from 'lodash';
import {
  CurrencyBlock,
  GameId,
  GameState,
  Hero,
  HeroId,
  WorldPosition,
} from '../interfaces';
import { uuid } from './rng';
import { localStorageSignal } from './signal';

export function blankHero(props: Partial<Hero> = {}): Hero {
  return {
    id: uuid() as HeroId,
    name: '',
    sprite: '',
    level: 1,
    xp: 0,
    hp: 10,
    baseStats: {
      force: 5,
      health: 10,
      speed: 1,
      aura: 1,
    },
    totalStats: {
      force: 5,
      health: 10,
      speed: 1,
      aura: 1,
    },

    equipment: {
      accessory: undefined,
      armor: undefined,
      trinket: undefined,
      weapon: undefined,
    },

    ...props,
  };
}

export function blankPosition(): WorldPosition {
  return { x: 0, y: 0 };
}

export function blankCurrencyBlock(): CurrencyBlock {
  return {
    'Fire Sliver': 0,
    'Fire Shard': 0,
    'Fire Crystal': 0,
    'Fire Core': 0,
    'Ice Sliver': 0,
    'Ice Shard': 0,
    'Ice Crystal': 0,
    'Ice Core': 0,
    'Air Sliver': 0,
    'Air Shard': 0,
    'Air Crystal': 0,
    'Air Core': 0,
    'Earth Sliver': 0,
    'Earth Shard': 0,
    'Earth Crystal': 0,
    'Earth Core': 0,
    'Soul Essence': 0,
    Mana: 0,
  };
}

export function blankGameState(): GameState {
  return {
    meta: {
      version: 1,
      isSetup: false,
      isPaused: false,
      createdAt: Date.now(),
      numTicks: 0,
    },
    gameId: uuid() as GameId,
    world: {
      width: 0,
      height: 0,
      nodes: {},
      homeBase: blankPosition(),
    },
    camera: blankPosition(),
    hero: {
      respawnTicks: 0,
      riskTolerance: 'low',
      heroes: [
        blankHero({ name: 'Ignatius', sprite: '0004' }),
        blankHero({ name: 'Aquara', sprite: '0000' }),
        blankHero({ name: 'Terrus', sprite: '0060' }),
        blankHero({ name: 'Zephyra', sprite: '0036' }),
      ],
      position: {
        nodeId: '',
        ...blankPosition(),
      },
      travel: {
        nodeId: '',
        ...blankPosition(),
        ticksLeft: 0,
      },
      location: {
        ticksLeft: 0,
        ticksTotal: 0,
      },
    },
    inventory: {
      items: [],
    },
    currency: {
      currencyPerTickEarnings: blankCurrencyBlock(),
      currencies: blankCurrencyBlock(),
    },
  };
}

const _gamestate = localStorageSignal<GameState>('gamestate', blankGameState());
export const gamestate: Signal<GameState> = _gamestate.asReadonly();

export const isGameStateReady = signal<boolean>(false);

export function resetGameState(): void {
  _gamestate.set(blankGameState());
}

export function setGameState(state: GameState): void {
  _gamestate.set(cloneDeep(state));
}

export function updateGamestate(func: (state: GameState) => GameState): void {
  const newState = func(gamestate());
  setGameState(newState);
}

export function myGameId(): GameId {
  return gamestate().gameId;
}
