import { Branded, Identifiable } from './identifiable';
import { GameStat } from './stat';

export type HeroId = Branded<string, 'HeroId'>;

export type HeroRiskTolerance = 'low' | 'medium' | 'high';

export type HeroStats = Record<GameStat, number>;

export interface Hero extends Identifiable {
  id: HeroId;

  sprite: string;
  level: number;
  xp: number;
  hp: number;

  baseStats: HeroStats;
}
