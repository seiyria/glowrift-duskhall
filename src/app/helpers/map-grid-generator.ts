import { WorldLocation } from '../interfaces';
import { getWorldNode } from './index';

export interface MapTileData {
  x: number;
  y: number;
  nodeData: WorldLocation;
}

export interface MapGridData {
  tiles: MapTileData[][];
  width: number;
  height: number;
}

/**
 * Generates map grid data for the current camera view
 * @param cameraX Camera x position
 * @param cameraY Camera y position
 * @param viewportWidth Viewport width in tiles
 * @param viewportHeight Viewport height in tiles
 * @param worldWidth World width in tiles
 * @param worldHeight World height in tiles
 * @returns Generated map grid data
 */
export function generateMapGrid(
  cameraX: number,
  cameraY: number,
  viewportWidth: number,
  viewportHeight: number,
  worldWidth: number,
  worldHeight: number,
): MapGridData {
  const width = Math.min(worldWidth, viewportWidth + 1);
  const height = Math.min(worldHeight, viewportHeight + 1);
  const tiles: MapTileData[][] = [];

  for (let y = 0; y < height; y++) {
    const tileRow: MapTileData[] = [];

    for (let x = 0; x < width; x++) {
      const worldNode = getWorldNode(x + cameraX, y + cameraY);
      if (worldNode) {
        tileRow.push({
          x,
          y,
          nodeData: worldNode,
        });
      }
    }

    if (tileRow.length > 0) {
      tiles.push(tileRow);
    }
  }

  return { tiles, width, height };
}

/**
 * Flattens a 2D tile grid into a 1D array
 * @param gridData Map grid data
 * @returns Flattened array of tile data
 */
export function flattenMapGrid(gridData: MapGridData): MapTileData[] {
  return gridData.tiles.flat();
}

/**
 * Finds tiles that match a specific condition
 * @param gridData Map grid data
 * @param predicate Condition to match
 * @returns Array of matching tiles
 */
export function findTilesWhere(
  gridData: MapGridData,
  predicate: (tile: MapTileData) => boolean,
): MapTileData[] {
  return flattenMapGrid(gridData).filter(predicate);
}
