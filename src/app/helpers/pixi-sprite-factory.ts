import { Container, Graphics, Sprite, Texture, Ticker } from 'pixi.js';
import { WorldLocation } from '../interfaces';

export interface NodeSpriteData {
  terrain: Sprite;
  object?: Sprite;
  claimIndicator?: Sprite;
}

export interface NodeSprites {
  [nodeKey: string]: NodeSpriteData;
}

/**
 * Creates terrain and object sprites for a single map node
 * @param x Grid x position
 * @param y Grid y position
 * @param nodeData World location data
 * @param terrainTextures Available terrain textures
 * @param objectTextures Available object textures
 * @param mapContainer Container to add sprites to
 * @param checkTexture Texture for claimed indicator
 * @param xTexture Texture for unclaimed indicator
 * @param onObjectClick Callback for object sprite clicks
 * @returns Created sprite data
 */
export function createNodeSprites(
  x: number,
  y: number,
  nodeData: WorldLocation,
  terrainTextures: Record<string, Texture>,
  objectTextures: Record<string, Texture>,
  mapContainer: Container,
  checkTexture?: Texture,
  xTexture?: Texture,
  onObjectClick?: (nodeData: WorldLocation) => void,
): NodeSpriteData | null {
  const pixelX = x * 64;
  const pixelY = y * 64;

  const terrainTexture = terrainTextures[nodeData.sprite];
  if (!terrainTexture) return null;

  const terrainSprite = new Sprite(terrainTexture);
  terrainSprite.x = pixelX;
  terrainSprite.y = pixelY;
  mapContainer.addChild(terrainSprite);

  const spriteData: NodeSpriteData = { terrain: terrainSprite };

  if (nodeData.objectSprite) {
    const objectTexture = objectTextures[nodeData.objectSprite];
    if (objectTexture) {
      const objectSprite = new Sprite(objectTexture);
      objectSprite.x = pixelX;
      objectSprite.y = pixelY;
      objectSprite.interactive = true;
      objectSprite.cursor = 'pointer';

      if (onObjectClick) {
        objectSprite.on('pointerdown', () => {
          onObjectClick(nodeData);
        });
      }

      mapContainer.addChild(objectSprite);
      spriteData.object = objectSprite;
    }
  }

  if (nodeData.objectSprite && checkTexture && xTexture) {
    const claimIndicator = createClaimIndicator(
      nodeData.currentlyClaimed,
      x,
      y,
      checkTexture,
      xTexture,
    );
    mapContainer.addChild(claimIndicator);
    spriteData.claimIndicator = claimIndicator;
  }

  return spriteData;
}

/**
 * Creates an animated player indicator at the specified position
 * @param x Grid x position
 * @param y Grid y position
 * @param container Container to add indicator to
 * @param ticker PIXI ticker for animation
 * @returns Graphics object with cleanup function
 */
export function createPlayerIndicator(
  x: number,
  y: number,
  container: Container,
  ticker: Ticker,
): Graphics & { cleanup: () => void } {
  const pixelX = x * 64;
  const pixelY = y * 64;

  const graphics = new Graphics();
  graphics.setStrokeStyle({ width: 4, color: 0x808080, alpha: 1 });
  graphics.rect(pixelX, pixelY, 64, 64);
  graphics.stroke();

  let alpha = 1;
  let direction = -1;

  const animate = () => {
    alpha += direction * 0.01;
    if (alpha <= 0.3) direction = 1;
    if (alpha >= 1) direction = -1;
    graphics.alpha = alpha;
  };

  ticker.add(animate);

  const cleanup = () => ticker.remove(animate);
  (graphics as any).cleanup = cleanup;

  container.addChild(graphics);

  return graphics as Graphics & { cleanup: () => void };
}

/**
 * Creates claim status indicator sprite (check or x)
 * @param isClaimed Whether the location is claimed
 * @param x Grid x position
 * @param y Grid y position
 * @param checkTexture Texture for claimed indicator
 * @param xTexture Texture for unclaimed indicator
 * @returns Sprite for the claim indicator
 */
export function createClaimIndicator(
  isClaimed: boolean,
  x: number,
  y: number,
  checkTexture: Texture,
  xTexture: Texture,
): Sprite {
  const pixelX = x * 64;
  const pixelY = y * 64;

  const texture = isClaimed ? checkTexture : xTexture;
  const sprite = new Sprite(texture);

  sprite.x = pixelX + 2;
  sprite.y = pixelY + 64 - 24;
  sprite.width = 20;
  sprite.height = 20;

  return sprite;
}
