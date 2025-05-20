import { Component, computed } from '@angular/core';
import {
  gamestate,
  getWorldNode,
  windowHeight,
  windowWidth,
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
    Math.min(gamestate().world.width, Math.floor(windowWidth() / 64) + 1),
  );
  public nodeHeight = computed(() =>
    Math.min(gamestate().world.height, Math.floor(windowHeight() / 64) + 1),
  );
  public camera = computed(() => gamestate().camera);

  public map = computed(() => {
    const width = this.nodeWidth();
    const height = this.nodeHeight();

    const nodes = [];

    // TODO: camera

    for (let y = 0; y < height; y++) {
      const nodeRow = [];

      for (let x = 0; x < width; x++) {
        const worldNode = getWorldNode(x, y);

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
