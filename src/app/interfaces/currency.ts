import { GameElement } from './element';

export type GameCurrency =
  | 'Mana'
  | 'Soul Essence'
  | `${GameElement} Sliver`
  | `${GameElement} Shard`
  | `${GameElement} Crystal`
  | `${GameElement} Core`;

export type CurrencyBlock = Record<GameCurrency, number>;
