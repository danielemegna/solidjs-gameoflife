import { AliveCells, includes } from "./AliveCells"
import { Coordinate } from "./Coordinate"
import { CellState, nextStateFor } from "./rules/StandardEvolutionRule"

export type Boundaries = {
  top: number,
  left: number
  bottom: number,
  right: number
} | undefined

export class Game {

  private aliveCells: AliveCells

  constructor(aliveCells: AliveCells) {
    this.aliveCells = aliveCells
  }

  getAliveCells(): AliveCells {
    return this.aliveCells
  }

  evolve(): Game {
    const boundaries = this.getBoundaries()
    if (!boundaries) return new Game([])

    const newAliveCells: AliveCells = []

    for (let x = boundaries.left; x <= boundaries.right; x++) {
      for (let y = boundaries.bottom; y <= boundaries.top; y++) {
        const currentCoordinate: Coordinate = [x, y]
        const currentState = this.cellStateOf(currentCoordinate)
        const aliveNeighbours = this.getAliveNeighboursOf(currentCoordinate)
        const nextState = nextStateFor(currentState, aliveNeighbours)
        if (nextState === CellState.ALIVE)
          newAliveCells.push(currentCoordinate)
      }
    }

    return new Game(newAliveCells)
  }

  getBoundaries(): Boundaries {
    if (this.aliveCells.length === 0)
      return undefined

    const xList = this.aliveCells.map(([x, _]) => x)
    const yList = this.aliveCells.map(([_, y]) => y)
    return {
      top: Math.max(...yList) + 1,
      left: Math.min(...xList) - 1,
      bottom: Math.min(...yList) - 1,
      right: Math.max(...xList) + 1,
    }
  }

  getAliveNeighboursOf([x, y]: Coordinate): number {

    const neighbours: Coordinate[] = [
      [x, y + 1],
      [x, y - 1],

      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1],

      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
    ]

    return neighbours
      .filter((c: Coordinate) => includes(this.aliveCells, c))
      .length

  }

  private cellStateOf(coordinate: Coordinate): CellState {
    return includes(this.aliveCells, coordinate) ?
      CellState.ALIVE : CellState.DEAD
  }

}