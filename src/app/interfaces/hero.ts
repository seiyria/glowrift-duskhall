import { Branded, Identifiable } from './identifiable';

export type HeroId = Branded<string, 'HeroId'>;

export type HeroStat = 'force' | 'health' | 'speed' | 'aura';

export type HeroStats = Record<HeroStat, number>;

export interface Hero extends Identifiable {
  id: HeroId;

  sprite: string;
  level: number;
  xp: number;
  hp: number;

  baseStats: HeroStats;
}
