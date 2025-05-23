import { clamp } from 'lodash';
import {
  GameStat,
  Hero,
  HeroId,
  HeroStats,
  WorldPosition,
} from '../interfaces';
import { randomNumber, seededrng } from './rng';
import { indexToSprite } from './sprite';
import { gamestate, updateGamestate } from './state-game';
import { getWorldNode } from './world';

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

export function heroTotalStat(hero: Hero, stat: GameStat): number {
  const baseStat = hero.baseStats[stat];
  return baseStat;
}

export function heroXpRequiredForLevelUp(level: number): number {
  return 10 * (level + 1) ** 2;
}

export function heroLevelUp(hero: Hero): void {
  const levelUpSeed = `${hero.id}-${hero.level}`;
  const rng = seededrng(levelUpSeed);

  const newStats = {
    force: hero.baseStats.force + randomNumber(3, rng),
    health: hero.baseStats.health + randomNumber(10, rng),
    speed: hero.baseStats.speed + randomNumber(1, rng),
    aura: hero.baseStats.aura + randomNumber(2, rng),
  };

  updateHeroData(hero.id, {
    level: hero.level + 1,
    xp: 0,
    baseStats: newStats,
    hp: newStats.health,
  });
}

export function heroGainXp(hero: Hero, xp: number): void {
  const maxXp = heroXpRequiredForLevelUp(hero.level);
  const newXp = clamp(hero.xp + xp, 0, maxXp);
  updateHeroData(hero.id, { xp: newXp });

  if (newXp >= maxXp && hero.level < 99) {
    heroLevelUp(hero);
  }
}

export function heroStats(hero: Hero): HeroStats {
  return {
    force: heroTotalStat(hero, 'force'),
    health: heroTotalStat(hero, 'health'),
    speed: heroTotalStat(hero, 'speed'),
    aura: heroTotalStat(hero, 'aura'),
  };
}

export function getHeroPosition(): WorldPosition {
  const hero = gamestate().hero;
  return {
    x: hero.position.x,
    y: hero.position.y,
  };
}

export function setHeroPosition(x: number, y: number): void {
  const node = getWorldNode(x, y);

  updateGamestate((state) => {
    state.hero.position.nodeId = node?.id ?? '';
    state.hero.position.x = x;
    state.hero.position.y = y;
    return state;
  });
}
