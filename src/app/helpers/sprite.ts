import { signal, WritableSignal } from '@angular/core';

export const spriteIterationCount: WritableSignal<number> = signal(0);

export function indexToSprite(index: number): string {
  return index.toString().padStart(4, '0');
}
