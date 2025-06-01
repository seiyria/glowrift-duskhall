export type ContentType =
  | 'worldconfig'
  | 'guardian'
  | 'skill'
  | 'weapon'
  | 'accessory'
  | 'trinket'
  | 'armor';

export interface Identifiable {
  id: string;
  name: string;
}

export interface Content extends Identifiable {
  __type: ContentType;
}

declare const __brand: unique symbol;

export type Branded<T, K> = T & {
  readonly [__brand]: K;
};
