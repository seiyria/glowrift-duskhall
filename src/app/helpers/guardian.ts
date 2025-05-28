import {
  GameStat,
  Guardian,
  GuardianData,
  GuardianId,
  WorldLocation,
} from '../interfaces';
import { getEntriesByType, getEntry } from './content';
import { randomIdentifiableChoice, seededrng } from './rng';
import { gamestate } from './state-game';

export function populateLocationWithGuardians(location: WorldLocation): void {
  const rng = seededrng(
    `$${gamestate().gameId}-${location.id}-${location.claimCount}`,
  );
  const numGuardians = numGuardiansForLocation(location);
  location.guardians = Array.from({ length: numGuardians }, () => {
    const randomGuardianDataId = randomIdentifiableChoice<GuardianData>(
      getEntriesByType<GuardianData>('guardian'),
      rng,
    );
    const randomGuardianData = getEntry<GuardianData>(randomGuardianDataId);
    if (!randomGuardianData) return undefined;

    return createGuardianForLocation(location, randomGuardianData);
  }).filter(Boolean) as Guardian[];
}

export function numGuardiansForLocation(location: WorldLocation): number {
  switch (location.nodeType) {
    case 'castle':
      return 10;
    case 'town':
      return 7;
    case 'dungeon':
      return 5;
    case 'village':
      return 3;
    case 'cave':
      return 1;
    default:
      return 0;
  }
}

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
    id: `guardian-${location.id}--${guardianData.id}` as GuardianId,
    hp: stats.health,
    stats,
  };
}
