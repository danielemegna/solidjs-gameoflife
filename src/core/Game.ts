import { Coordinate } from "./Coordinate"

export type AliveCells = Coordinate[]
export type Boundaries = [Coordinate, Coordinate] | undefined

export class Game {

  private aliveCells: AliveCells

  constructor(aliveCells: AliveCells) {
    this.aliveCells = aliveCells
  }

  getAliveCells(): AliveCells {
    return this.aliveCells
  }

  evolve(): Game {
    const newAliveCells: AliveCells = []
    //.... evolution here
    return new Game(newAliveCells)
  }

  getBoundaries(): Boundaries {
    if (this.aliveCells.length === 0)
      return undefined

    const xList = this.aliveCells.map(([x, _]) => x)
    const yList = this.aliveCells.map(([_, y]) => y)
    return [
      [
        Math.min(...xList) - 1,
        Math.min(...yList) - 1
      ],
      [
        Math.max(...xList) + 1,
        Math.max(...yList) + 1
      ]
    ]
  }
}