import { Identifiable } from './identifiable';

export type WorldNodeType = 'town' | 'village' | 'cave' | 'dungeon' | 'castle';

export interface WorldConfig extends Identifiable {
  width: number;
  height: number;

  maxLevel: number;
  nodeCount: Record<WorldNodeType, { min: number; max: number }>;
}
