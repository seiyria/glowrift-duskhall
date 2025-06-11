import { Artable } from './animatable';
import { ElementBlock } from './element';
import { Branded, Content } from './identifiable';
import { StatBlock } from './stat';

export type GuardianId = Branded<string, 'GuardianId'>;

export type GuardianData = Artable &
  Content & {
    id: GuardianId;

    statScaling: StatBlock;
    skillIds: string[];

    resistance: ElementBlock;
    affinity: ElementBlock;
  };

export type Guardian = GuardianData & {
  hp: number;
  stats: StatBlock;
};
