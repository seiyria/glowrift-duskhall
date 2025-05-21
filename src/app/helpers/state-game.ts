import { Signal, signal, WritableSignal } from '@angular/core';
import { cloneDeep } from 'lodash';
import { GameId, GameState } from '../interfaces';
import { uuid } from './rng';
import { localStorageSignal } from './signal';

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
  };
}

const _gamestate: WritableSignal<GameState> = localStorageSignal(
  'gamestate',
  blankGameState(),
);
export const gamestate: Signal<GameState> = _gamestate.asReadonly();

export const isGameStateReady = signal<boolean>(false);

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
