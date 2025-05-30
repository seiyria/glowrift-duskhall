import { signal } from '@angular/core';
import { currentCombatHasGuardiansAlive } from './combat';
import { gamestate } from './state-game';
import { travelToNode } from './travel';
import { globalStatusText } from './ui';
import { getCurrentWorldNode, getWorldNode } from './world';

export const exploreProgressText = signal<string>('');
export const exploreProgressPercent = signal<number>(0);

export function isExploring() {
  const currentPosition = getCurrentWorldNode();
  if (!currentPosition) return false;
  return currentCombatHasGuardiansAlive();
}

export function updateExploringAndGlobalStatusText(status: string): void {
  exploreProgressText.set(status);
  globalStatusText.set(status);
}

export function travelHome(): void {
  const homePosition = gamestate().world.homeBase;
  const homeNode = getWorldNode(homePosition.x, homePosition.y);

  if (!homeNode) {
    console.error('Home node not found in the world.');
    return;
  }

  updateExploringAndGlobalStatusText('Returning home...');
  travelToNode(homeNode);
}
