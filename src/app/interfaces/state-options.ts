export type GameOption =
  | 'showDebug'
  | 'debugConsoleLogStateUpdates'
  | 'debugMapNodePositions'
  | 'debugGameloopTimerUpdates'
  | 'audioPlay';

export type GameOptions = Record<GameOption, boolean> & {
  uiTheme: string;
  volume: number;
};
