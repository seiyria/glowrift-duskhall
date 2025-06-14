import { Assets, Rectangle, Texture } from 'pixi.js';

export interface TextureAtlas {
  [key: string]: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface LoadedTextures {
  [spriteName: string]: Texture;
}

/**
 * Loads textures from a spritesheet and atlas data
 * @param spritesheetPath Path to the spritesheet image
 * @param atlasData Atlas data containing sprite coordinates
 * @returns Object containing loaded textures keyed by sprite name
 */
export async function loadTexturesFromAtlas(
  spritesheetPath: string,
  atlasData: TextureAtlas,
): Promise<LoadedTextures> {
  try {
    const spritesheetTexture = await Assets.load(spritesheetPath);
    const textures: LoadedTextures = {};

    Object.keys(atlasData).forEach((key) => {
      const frameData = atlasData[key];
      const texture = new Texture({
        source: spritesheetTexture.source,
        frame: new Rectangle(
          frameData.x,
          frameData.y,
          frameData.width,
          frameData.height,
        ),
      });

      const spriteName = key.split('/').pop()?.replace('.png', '') || '';
      textures[spriteName] = texture;
    });

    return textures;
  } catch (error) {
    console.error(`Failed to load textures from ${spritesheetPath}:`, error);
    throw error;
  }
}

/**
 * Loads both terrain and object textures for the game map
 * @param contentService Service containing art atlas data
 * @returns Object containing both terrain and object textures
 */
export async function loadGameMapTextures(contentService: any): Promise<{
  terrainTextures: LoadedTextures;
  objectTextures: LoadedTextures;
}> {
  const [terrainTextures, objectTextures] = await Promise.all([
    loadTexturesFromAtlas(
      'art/spritesheets/world-terrain.png',
      contentService.artAtlases()['world-terrain'],
    ),
    loadTexturesFromAtlas(
      'art/spritesheets/world-object.png',
      contentService.artAtlases()['world-object'],
    ),
  ]);

  return { terrainTextures, objectTextures };
}

/**
 * Creates a canvas-based texture for an icon
 * @param iconText Unicode character for the icon (e.g., "✓" or "✗")
 * @param color Color of the icon
 * @param size Size of the icon in pixels
 * @returns PIXI Texture
 */
export function createIconTexture(
  iconText: string,
  color: string = '#ffffff',
  size: number = 20,
): Texture {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  canvas.width = size;
  canvas.height = size;

  ctx.clearRect(0, 0, size, size);

  ctx.fillStyle = color;
  ctx.font = `bold ${size - 4}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.strokeText(iconText, size / 2, size / 2);
  ctx.fillText(iconText, size / 2, size / 2);

  return Texture.from(canvas);
}

/**
 * Creates check and X textures for claim indicators
 * @returns Object with check and X textures
 */
export function createClaimIndicatorTextures(): {
  checkTexture: Texture;
  xTexture: Texture;
} {
  return {
    checkTexture: createIconTexture('✓', '#00ff00', 20),
    xTexture: createIconTexture('✗', '#ff0000', 20),
  };
}
