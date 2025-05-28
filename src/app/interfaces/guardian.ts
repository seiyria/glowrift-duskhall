import { HeroStats } from './hero';
import { Branded, Content } from './identifiable';

export type GuardianId = Branded<string, 'GuardianId'>;

export interface GuardianData extends Content {
  id: GuardianId;

  sprite: string;
  statScaling: HeroStats;
}

export interface Guardian extends GuardianData {
  hp: number;
  stats: HeroStats;
}
