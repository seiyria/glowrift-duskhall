import { clamp } from 'lodash';
import { gamestate, updateGamestate } from './state-game';
import { windowHeightTiles, windowWidthTiles } from './ui';

export function setCameraPosition(x: number, y: number) {
  const worldWidth = gamestate().world.width;
  const worldHeight = gamestate().world.height;

  const tileWidth = windowWidthTiles();
  const tileHeight = windowHeightTiles();

  updateGamestate((state) => {
    x = clamp(Math.floor(x), 0, Math.floor(worldWidth - tileWidth));
    y = clamp(Math.floor(y), 0, Math.floor(worldHeight - tileHeight));
    state.camera.x = x;
    state.camera.y = y;
    return state;
  });
}
