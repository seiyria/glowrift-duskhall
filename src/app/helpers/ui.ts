import { computed, signal, WritableSignal } from '@angular/core';

export const windowWidth: WritableSignal<number> = signal(-1);
export const windowHeight: WritableSignal<number> = signal(-1);

export const windowWidthTiles = computed(() => Math.floor(windowWidth() / 64));
export const windowHeightTiles = computed(() =>
  Math.floor(windowHeight() / 64),
);

export const showOptionsMenu: WritableSignal<boolean> = signal(false);
export const showHeroesMenu: WritableSignal<boolean> = signal(false);

export function closeAllMenus() {
  showHeroesMenu.set(false);
  showOptionsMenu.set(false);
}
