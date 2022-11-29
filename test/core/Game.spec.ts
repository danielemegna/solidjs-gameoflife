import { describe, expect, test } from '@jest/globals'
import { AliveCells } from '../../src/core/AliveCells'
import { Coordinate } from '../../src/core/Coordinate'
import { Boundaries, Game } from '../../src/core/Game'

describe('get alive cells from a new Game', () => {

  test('empty board has no alive cells', () => {
    const aliveCellCoordinates: Coordinate[] = []
    const game = new Game(aliveCellCoordinates)

    const aliveCells: AliveCells = game.getAliveCells()

    expect(aliveCells).toStrictEqual([])
  })

  test('init board with some alive cells', () => {
    const aliveCellCoordinates: Coordinate[] = [[0, 1], [0, 2], [3, 3]]
    const game = new Game(aliveCellCoordinates)

    const aliveCells: AliveCells = game.getAliveCells()

    expect(aliveCells).toStrictEqual(aliveCellCoordinates)
  })

})

describe('evolve a Game and check alive cells', () => {

  test('evolved empty board has no alive cells', () => {
    const game = new Game([])

    const evolved = game.evolve()

    const aliveCells: AliveCells = evolved.getAliveCells()
    expect(aliveCells).toStrictEqual([])
  })

  test('single alive cell dead in an empty board', () => {
    const aliveCellCoordinate: Coordinate = [0, 1]
    const game = new Game([aliveCellCoordinate])

    const evolved = game.evolve()

    const aliveCells: AliveCells = evolved.getAliveCells()
    expect(aliveCells).toStrictEqual([])
  })


  test('2x2 block is a static pattern', () => {
    /*
      . . .     . . .
      x x . --> x x .
      x x .     x x .
    */
    const aliveCellCoordinates: Coordinate[] = [[0, 0], [0, 1], [1, 0], [1, 1]]
    const game = new Game(aliveCellCoordinates)

    const evolvedGame = game.evolve()

    const aliveCells: AliveCells = evolvedGame.getAliveCells()
    expect(aliveCells).toStrictEqual(aliveCellCoordinates)
  })

  test('single alive cell dead in an empty board', () => {
    /*
      . x .     . . .
      . x . --> x x x
      . x .     . . .
    */
    const aliveCellCoordinates: Coordinate[] = [[1, 0], [1, 1], [1, 2]]
    const game = new Game(aliveCellCoordinates)

    const evolvedGame = game.evolve()

    const aliveCells: AliveCells = evolvedGame.getAliveCells()
    const expectedEvolvedAliveCoordinates: Coordinate[] = [[0, 1], [1, 1], [2, 1]]
    expect(aliveCells).toStrictEqual(expectedEvolvedAliveCoordinates)
  })

})

describe('get game boundaries from a Game [top-left, bottom-right]', () => {

  test('empty game has undefined boundaries', () => {
    const aliveCellCoordinates: Coordinate[] = []
    const game = new Game(aliveCellCoordinates)

    const boundaries: Boundaries = game.getBoundaries()

    const expectedBoundaries: Boundaries = undefined
    expect(boundaries).toStrictEqual(expectedBoundaries)
  })

  test('boundaries with single alive cell', () => {
    /*
      . . .
      . x . --> [0,2],[2,0]
      . . .
    */
    const aliveCellCoordinates: Coordinate[] = [[1, 1]]
    const game = new Game(aliveCellCoordinates)

    const boundaries: Boundaries = game.getBoundaries()

    const expectedBoundaries: Boundaries = { top: 2, left: 0, bottom: 0, right: 2 }
    expect(boundaries).toStrictEqual(expectedBoundaries)
  })

  test('boundaries with more alive cell', () => {
    /*
      . x x
      . x . --> [-1,3],[3,-1]
      x x .
    */
    const aliveCellCoordinates: Coordinate[] = [[0, 0], [1, 0], [1, 1], [1, 2], [2, 2]]
    const game = new Game(aliveCellCoordinates)

    const boundaries: Boundaries = game.getBoundaries()

    const expectedBoundaries: Boundaries = { top: 3, left: -1, bottom: -1, right: 3 }
    expect(boundaries).toStrictEqual(expectedBoundaries)
  })

})

test('get alive neighbours of a coordinate', () => {

  /*
    . x x
    . x .
    x x .
  */
  const aliveCellCoordinates: Coordinate[] = [[0, 0], [1, 0], [1, 1], [1, 2], [2, 2]]
  const game = new Game(aliveCellCoordinates)

  expect(game.getAliveNeighboursOf([-1, 3])).toBe(0)
  expect(game.getAliveNeighboursOf([0, 2])).toBe(2)
  expect(game.getAliveNeighboursOf([1, 1])).toBe(4)
  expect(game.getAliveNeighboursOf([3, 3])).toBe(1)
  expect(game.getAliveNeighboursOf([-1, -1])).toBe(1)

})