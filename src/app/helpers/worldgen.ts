import {
  Guardian,
  GuardianData,
  GuardianId,
  WorldLocation,
} from '../interfaces';
import { getEntriesByType, getEntry } from './content';
import { pickRandomItemDefinition } from './equipment';
import { createGuardianForLocation } from './guardian';
import { randomIdentifiableChoice, seededrng } from './rng';
import { gamestate } from './state-game';

export function populateLocationWithLoot(location: WorldLocation): void {
  if (location.currentlyClaimed) return;

  const rng = seededrng(
    `$${gamestate().gameId}-${location.id}-${location.claimCount}`,
  );
  const numLoot = numLootForLocation(location);
  location.claimLoot = Array.from({ length: numLoot }, () => {
    return pickRandomItemDefinition(rng);
  }).filter(Boolean);
}

export function numLootForLocation(location: WorldLocation): number {
  switch (location.nodeType) {
    case 'castle':
      return 5;
    case 'town':
      return 4;
    case 'dungeon':
      return 3;
    case 'village':
      return 2;
    case 'cave':
      return 1;
    default:
      return 0;
  }
}

export function populateLocationWithGuardians(location: WorldLocation): void {
  if (location.currentlyClaimed) return;

  const rng = seededrng(
    `$${gamestate().gameId}-${location.id}-${location.claimCount}`,
  );
  const numGuardians = numGuardiansForLocation(location);
  location.guardians = Array.from({ length: numGuardians }, (_, index) => {
    const randomGuardianDataId = randomIdentifiableChoice<GuardianData>(
      getEntriesByType<GuardianData>('guardian'),
      rng,
    );
    const randomGuardianData = getEntry<GuardianData>(randomGuardianDataId);
    if (!randomGuardianData) return undefined;

    return {
      ...createGuardianForLocation(location, randomGuardianData),
      id: `guardian-${location.id}-${index}-${randomGuardianData.id}` as GuardianId,
    };
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
