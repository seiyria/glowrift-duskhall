import { GameElement } from './element';
import { EquipmentItemDefinition } from './equipment';
import { Guardian } from './guardian';
import { Identifiable } from './identifiable';
import { LocationType } from './worldconfig';

export interface WorldPosition {
  x: number;
  y: number;
}

export interface WorldLocationElement {
  element: GameElement;
  intensity: number;
}

export type WorldLocation = WorldPosition &
  Identifiable & {
    nodeType?: LocationType;
    elements: WorldLocationElement[];
    sprite: string;
    objectSprite: string;

    currentlyClaimed: boolean;
    claimCount: number;
    encounterLevel: number;
    guardians: Guardian[];
    claimLoot: EquipmentItemDefinition[];
  };
