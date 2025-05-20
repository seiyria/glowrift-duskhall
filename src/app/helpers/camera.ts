import { updateGamestate } from './state-game';

export function setCameraPosition(x: number, y: number) {
  updateGamestate((state) => {
    state.camera.x = Math.floor(x);
    state.camera.y = Math.floor(y);
    return state;
  });
}
