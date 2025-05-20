import { signal, WritableSignal } from '@angular/core';

export const windowWidth: WritableSignal<number> = signal(-1);
export const windowHeight: WritableSignal<number> = signal(-1);
