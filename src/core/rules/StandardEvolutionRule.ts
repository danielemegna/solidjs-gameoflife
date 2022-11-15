export enum CellState { DEAD, ALIVE }

export const nextStateFor = (currentState: CellState, aliveNeighbours: number): CellState => {
    if(aliveNeighbours === 3)
        return CellState.ALIVE
    if(currentState === CellState.ALIVE && aliveNeighbours === 2)
        return CellState.ALIVE
    return CellState.DEAD
}