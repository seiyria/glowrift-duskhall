import { Content } from './identifiable';
import { GameStat } from './stat';

export type CombatSkillTargetType = 'allies' | 'enemies' | 'self' | 'all';

export interface CombatSkill extends Content {
  targets: number;
  targetType: CombatSkillTargetType;
  damageScaling: Partial<Record<GameStat, number>>;
}
