import { Signal, signal, WritableSignal } from '@angular/core';
import { cloneDeep } from 'lodash';
import { GameId, GameState, Hero, HeroId } from '../interfaces';
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

    ...props,
  };
}

export function blankGameState(): GameState {
  return {
    meta: {
      version: 1,
      isSetup: false,
      createdAt: Date.now(),
      numTicks: 0,
    },
    gameId: uuid() as GameId,
    world: {
      width: 0,
      height: 0,
      nodes: {},
    },
    camera: {
      x: 0,
      y: 0,
    },
    hero: {
      heroes: [
        blankHero({ name: 'Ignatius', sprite: '0004' }),
        blankHero({ name: 'Aquara', sprite: '0000' }),
        blankHero({ name: 'Terrus', sprite: '0060' }),
        blankHero({ name: 'Zephyra', sprite: '0036' }),
      ],
    },
  };
}

const _gamestate: WritableSignal<GameState> = localStorageSignal(
  'gamestate',
  blankGameState(),
);
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
