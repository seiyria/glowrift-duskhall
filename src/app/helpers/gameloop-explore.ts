import {
  exploreProgressPercent,
  exploreProgressText,
  isExploring,
} from './explore';
import { allHeroes, heroGainXp } from './hero';
import { notify } from './notify';
import { updateGamestate } from './state-game';
import { isTraveling } from './travel';
import { getCurrentWorldNode } from './world';

export function exploreGameloop(numTicks: number): void {
  if (!isExploring()) return;
  if (isTraveling()) return;

  let claimedNode = false;
  updateGamestate((state) => {
    state.hero.location.ticksLeft -= numTicks;

    exploreProgressPercent.set(
      ((state.hero.location.ticksTotal - state.hero.location.ticksLeft) /
        state.hero.location.ticksTotal) *
        100,
    );
    exploreProgressText.set(
      `Exploring... ${state.hero.location.ticksLeft} ticks left.`,
    );

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
    notify(`You have claimed ${currentNode.name}!`, 'LocationClaim');
    exploreProgressPercent.set(0);
    exploreProgressText.set('');

    allHeroes().forEach((hero) => {
      heroGainXp(hero, currentNode.encounterLevel * 10);
    });
  }
}
