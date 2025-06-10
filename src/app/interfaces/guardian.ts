import { Artable } from './animatable';
import { Branded, Content } from './identifiable';
import { StatBlock } from './stat';

export type GuardianId = Branded<string, 'GuardianId'>;

export type GuardianData = Artable &
  Content & {
    id: GuardianId;

    statScaling: StatBlock;
  };

export interface Guardian extends GuardianData {
  hp: number;
  stats: StatBlock;
}
