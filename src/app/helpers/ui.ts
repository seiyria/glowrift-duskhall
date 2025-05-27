import { computed, signal } from '@angular/core';
import { WorldLocation } from '../interfaces';

export const windowWidth = signal<number>(-1);
export const windowHeight = signal<number>(-1);

export const windowWidthTiles = computed(() => Math.floor(windowWidth() / 64));
export const windowHeightTiles = computed(() =>
  Math.floor(windowHeight() / 64),
);

export const globalStatusText = signal<string>('');

export const showLocationMenu = signal<WorldLocation | undefined>(undefined);
export const showOptionsMenu = signal<boolean>(false);
export const showHeroesMenu = signal<boolean>(false);

export function closeAllMenus() {
  showHeroesMenu.set(false);
  showOptionsMenu.set(false);
  showLocationMenu.set(undefined);
}
