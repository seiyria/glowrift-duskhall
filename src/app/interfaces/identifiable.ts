export type ContentType = 'worldconfig';

export interface Identifiable {
  id: string;
  name: string;
}

export interface Content extends Identifiable {
  defaultUnlocked?: boolean;
  __type: ContentType;
}

declare const __brand: unique symbol;

export type Branded<T, K> = T & {
  readonly [__brand]: K;
};
