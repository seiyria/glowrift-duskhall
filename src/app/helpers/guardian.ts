import { GameStat, Guardian, GuardianData, WorldLocation } from '../interfaces';

export function createGuardianForLocation(
  location: WorldLocation,
  guardianData: GuardianData,
): Guardian {
  const stats: Record<GameStat, number> = {
    aura: location.encounterLevel * guardianData.statScaling.aura,
    force: location.encounterLevel * guardianData.statScaling.force,
    health: location.encounterLevel * guardianData.statScaling.health,
    speed: location.encounterLevel * guardianData.statScaling.speed,
  };

  return {
    ...guardianData,
    hp: stats.health,
    stats,
  };
}
