import { HeroStats } from './hero';
import { Branded } from './identifiable';

export type CombatId = Branded<string, 'CombatId'>;

export interface CombatLog {
  combatId: CombatId;
  messageId: string;
  timestamp: number;
  locationName: string;
  message: string;
}

export interface Combatant {
  id: string;
  name: string;

  sprite: string;
  level: number;
  hp: number;

  baseStats: HeroStats;
  stats: HeroStats;
}

export interface Combat {
  id: CombatId;
  locationName: string;
  rounds: number;
  heroes: Combatant[];
  guardians: Combatant[];
}
