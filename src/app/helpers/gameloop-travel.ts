import { gamestate, updateGamestate } from './state-game';
import { isTraveling } from './travel';
import { getCurrentWorldNode } from './world';

export function travelGameloop(numTicks: number): void {
  if (!isTraveling()) return;

  const travel = gamestate().hero.travel;

  updateGamestate((state) => {
    state.hero.travel.ticksLeft -= numTicks;
    if (state.hero.travel.ticksLeft > 0) return state;

    state.hero.position.nodeId = travel.nodeId;
    state.hero.position.x = travel.x;
    state.hero.position.y = travel.y;

    state.hero.travel.nodeId = '';
    state.hero.travel.ticksLeft = 0;
    state.hero.travel.x = 0;
    state.hero.travel.y = 0;

    const newNode = getCurrentWorldNode(state);
    state.hero.location.ticksLeft = newNode?.currentlyClaimed
      ? 0
      : ((newNode?.encounterLevel ?? 1) + 1) * 5;

    return state;
  });
}
