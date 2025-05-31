import { Component, computed } from '@angular/core';
import {
  gamestate,
  getWorldNode,
  windowHeightTiles,
  windowWidthTiles,
} from '../../helpers';
import { GameMapNodeComponent } from '../game-map-node/game-map-node.component';

@Component({
  selector: 'app-game-map',
  imports: [GameMapNodeComponent],
  templateUrl: './game-map.component.html',
  styleUrl: './game-map.component.scss',
})
export class GameMapComponent {
  public nodeWidth = computed(() =>
    Math.min(gamestate().world.width, windowWidthTiles() + 1),
  );
  public nodeHeight = computed(() =>
    Math.min(gamestate().world.height, windowHeightTiles() + 1),
  );
  public camera = computed(() => gamestate().camera);

  public map = computed(() => {
    const width = this.nodeWidth();
    const height = this.nodeHeight();

    const nodes = [];

    const camera = this.camera();

    for (let y = 0; y < height; y++) {
      const nodeRow = [];

      for (let x = 0; x < width; x++) {
        const worldNode = getWorldNode(x + camera.x, y + camera.y);
        if (!worldNode) continue;

        nodeRow.push({
          x,
          y,
          nodeData: worldNode!,
        });
      }

      nodes.push(nodeRow);
    }

    return nodes;
  });
}
