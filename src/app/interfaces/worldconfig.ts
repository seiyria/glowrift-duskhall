import { Identifiable } from './identifiable';

export type WorldNode = 'town' | 'village' | 'cave' | 'dungeon' | 'castle';

export interface WorldConfig extends Identifiable {
  width: number;
  height: number;

  nodeCount: Record<WorldNode, { min: number; max: number }>;
}
