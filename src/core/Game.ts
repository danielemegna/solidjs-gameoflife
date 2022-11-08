export type Coordinate = [number, number]
export type AliveCells = Coordinate[]
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
    return new Game(newAliveCells)
  }
}