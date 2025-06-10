import { Artable } from './animatable';
import { EquipmentBlock } from './equipment';
import { Branded, Identifiable } from './identifiable';
import { EquipmentSkill } from './skill';
import { StatBlock } from './stat';

export type HeroId = Branded<string, 'HeroId'>;

export type HeroRiskTolerance = 'low' | 'medium' | 'high';

export type Hero = Identifiable &
  Artable & {
    id: HeroId;

    level: number;
    xp: number;
    hp: number;

    baseStats: StatBlock;
    totalStats: StatBlock;

    equipment: EquipmentBlock;
    skills: (EquipmentSkill | undefined)[];
  };
