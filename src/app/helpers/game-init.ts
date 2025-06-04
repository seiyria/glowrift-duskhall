import { WorldConfig } from '../interfaces';
import { setCameraPosition } from './camera';
import { setHeroPosition } from './hero';
import { finishSetup } from './setup';
import { setWorld } from './world';
import { generateWorld } from './worldgen';

export function startGame(config: WorldConfig): void {
  const world = generateWorld(config);

  setWorld(world);
  setCameraPosition(config.width / 2, config.height / 2);
  setHeroPosition(config.width / 2, config.height / 2);
  finishSetup();
}
