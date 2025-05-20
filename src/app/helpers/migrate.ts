import { merge } from 'lodash';
import { blankGameState, gamestate, setGameState } from './state-game';
import { defaultOptions, options, setOptions } from './state-options';

export function migrateGameState() {
  const state = gamestate();
  const newState = merge(blankGameState(), state);
  setGameState(newState);
}

export function migrateOptionsState() {
  const state = options();
  const newState = merge(defaultOptions(), state);
  setOptions(newState);
}
