import { Artable } from './animatable';
import { Branded } from './identifiable';
import { EquipmentSkill } from './skill';
import { StatBlock } from './stat';
import { WorldPosition } from './world';

export type CombatId = Branded<string, 'CombatId'>;

export interface CombatLog {
  combatId: CombatId;
  messageId: string;
  timestamp: number;
  locationName: string;
  message: string;
}

export type Combatant = Artable & {
  id: string;
  name: string;

  level: number;
  hp: number;

  baseStats: StatBlock;
  stats: StatBlock;

  skillIds: string[];
  skillRefs: EquipmentSkill[];
};

export interface Combat {
  id: CombatId;
  locationName: string;
  locationPosition: WorldPosition;
  rounds: number;
  heroes: Combatant[];
  guardians: Combatant[];
}
