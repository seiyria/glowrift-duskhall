export type GameOption =
  | 'showDebug'
  | 'debugConsoleLogStateUpdates'
  | 'debugMapNodePositions';

export type GameOptions = Record<GameOption, boolean> & {
  uiTheme: string;
  volume: number;
};
