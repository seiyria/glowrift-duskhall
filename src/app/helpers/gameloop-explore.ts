import {
  currentCombat,
  currentCombatHasGuardiansAlive,
  doCombatIteration,
  generateCombatForLocation,
} from './combat';
import { updateExploringAndGlobalStatusText } from './explore';
import { updateGamestate } from './state-game';
import { isTraveling } from './travel';
import { getCurrentWorldNode } from './world';

export function exploreGameloop(numTicks: number): void {
  if (isTraveling()) return;

  const node = getCurrentWorldNode();
  if (!node) return;
  if (node.currentlyClaimed) return;

  // generate a combat, move to next tick
  if (!currentCombat()) {
    updateExploringAndGlobalStatusText(
      `Exploring ${node.name}... engaging in combat.`,
    );
    updateGamestate((state) => {
      state.hero.combat = generateCombatForLocation(node);
      return state;
    });

    return;
  }

  // if we have guardians alive, we're doing combat
  if (currentCombatHasGuardiansAlive()) {
    updateExploringAndGlobalStatusText(
      `Exploring ${node.name}... ${node.guardians.length} guardian(s) alive.`,
    );

    for (let i = 0; i < numTicks; i++) {
      doCombatIteration();
    }
    return;
  }
}
