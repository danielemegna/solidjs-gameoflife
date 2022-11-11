export type Coordinate = [number, number]
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
    if(this.aliveCells.length === 0)
      return undefined


    const [x,y]: Coordinate = this.aliveCells[0]
    return [[x-1,y-1],[x+1,y+1]]
  }
}