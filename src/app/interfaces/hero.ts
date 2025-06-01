import { EquipmentBlock } from './equipment';
import { Branded, Identifiable } from './identifiable';
import { StatBlock } from './stat';

export type HeroId = Branded<string, 'HeroId'>;

export type HeroRiskTolerance = 'low' | 'medium' | 'high';

export interface Hero extends Identifiable {
  id: HeroId;

  sprite: string;
  level: number;
  xp: number;
  hp: number;

  baseStats: StatBlock;
  totalStats: StatBlock;

  equipment: EquipmentBlock;
}
