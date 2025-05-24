import { allHeroes, heroGainXp } from './hero';
import { getCurrentWorldNode } from './world';

export function townGameloop(numTicks: number): void {
  const currentNode = getCurrentWorldNode();
  if (currentNode?.nodeType !== 'town') return;

  allHeroes().forEach((hero) => {
    heroGainXp(hero, numTicks);
  });
}
