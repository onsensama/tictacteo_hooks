export interface GameState {
    history: { squares: string[] }[],
    xIsNext: boolean,
    stepNumber: number
  }
