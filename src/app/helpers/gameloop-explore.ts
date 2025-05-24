import { isExploring } from './explore';
import { allHeroes, heroGainXp } from './hero';
import { updateGamestate } from './state-game';
import { isTraveling } from './travel';
import { getCurrentWorldNode } from './world';

export function exploreGameloop(numTicks: number): void {
  if (!isExploring()) return;
  if (isTraveling()) return;

  let claimedNode = false;
  updateGamestate((state) => {
    state.hero.location.ticksLeft -= numTicks;
    if (state.hero.location.ticksLeft > 0) return state;

    const node = getCurrentWorldNode(state);
    if (node) {
      node.claimCount++;
      node.currentlyClaimed = true;
    }
    claimedNode = true;

    return state;
  });

  const currentNode = getCurrentWorldNode();
  if (claimedNode && currentNode) {
    allHeroes().forEach((hero) => {
      heroGainXp(hero, currentNode.encounterLevel * 10);
    });
  }
}
