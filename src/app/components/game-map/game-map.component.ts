import { Component, computed, signal } from '@angular/core';
import {
  gamestate,
  getWorldNode,
  setCameraPosition,
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
  public isDragging = signal<boolean>(false);
  public lastPanPosition = signal<{ x: number; y: number } | null>(null);
  private panSensitivity = 2;

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

  public panStart(event: MouseEvent): void {
    event.preventDefault();

    this.isDragging.set(true);
    this.lastPanPosition.set({ x: event.clientX, y: event.clientY });
    setCameraPosition(0, 0);
  }

  public panMove(event: MouseEvent): void {
    if (!this.isDragging() || !this.lastPanPosition()) {
      return;
    }

    const lastPos = this.lastPanPosition()!;
    const deltaX = event.clientX - lastPos.x;
    const deltaY = event.clientY - lastPos.y;

    const currentCameraPos = gamestate().camera;

    const newCameraX = currentCameraPos.x - deltaX / this.panSensitivity;
    const newCameraY = currentCameraPos.y - deltaY / this.panSensitivity;

    setCameraPosition(newCameraX, newCameraY);

    this.lastPanPosition.set({ x: event.clientX, y: event.clientY });
  }

  public panEnd(): void {
    this.isDragging.set(false);
    this.lastPanPosition.set(null);
  }

  public panLeave(): void {
    if (this.isDragging()) {
      this.panEnd();
    }
  }
}
