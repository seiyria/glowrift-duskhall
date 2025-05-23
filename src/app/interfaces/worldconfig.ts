import { Identifiable } from './identifiable';

export type LocationType = 'town' | 'village' | 'cave' | 'dungeon' | 'castle';

export interface WorldConfig extends Identifiable {
  width: number;
  height: number;

  maxLevel: number;
  nodeCount: Record<LocationType, { min: number; max: number }>;
}
