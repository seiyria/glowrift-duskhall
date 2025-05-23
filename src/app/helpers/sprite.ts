import { signal } from '@angular/core';

export const spriteIterationCount = signal<number>(0);

export function indexToSprite(index: number): string {
  return index.toString().padStart(4, '0');
}
