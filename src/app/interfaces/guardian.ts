import { Branded, Content } from './identifiable';
import { StatBlock } from './stat';

export type GuardianId = Branded<string, 'GuardianId'>;

export interface GuardianData extends Content {
  id: GuardianId;

  sprite: string;
  statScaling: StatBlock;
}

export interface Guardian extends GuardianData {
  hp: number;
  stats: StatBlock;
}
