import { Hero, HeroId } from '../interfaces';
import { indexToSprite } from './sprite';
import { updateGamestate } from './state-game';

export function updateHeroData(heroId: HeroId, heroData: Partial<Hero>): void {
  updateGamestate((state) => {
    const hero = state.hero.heroes.find((f) => f.id === heroId);
    if (!hero) {
      throw new Error(`Hero with ID ${heroId} not found`);
    }

    Object.assign(hero, heroData);
    return state;
  });
}

export function pickSpriteForHeroName(heroName: string): string {
  if (heroName === 'Ignatius') return '0004';
  if (heroName === 'Aquara') return '0000';
  if (heroName === 'Terrus') return '0060';
  if (heroName === 'Zephyra') return '0036';

  const nameHash = Array.from(heroName).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0,
  );
  const spriteIndex = 4 * (nameHash % 27);
  return indexToSprite(spriteIndex);
}
