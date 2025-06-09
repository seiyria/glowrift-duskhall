export type GameOption =
  | 'showDebug'
  | 'debugConsoleLogStateUpdates'
  | 'debugMapNodePositions'
  | 'debugGameloopTimerUpdates';

export type GameOptions = Record<GameOption, boolean> & {
  uiTheme: string;
  volume: number;
};
