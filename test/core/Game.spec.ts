import { describe, expect, test } from '@jest/globals'
import { AliveCells, Game } from '../../src/core/Game'

describe('Game acceptance tests', () => {

  test('empty board has no alive cells', () => {
    const game = new Game([])
    const aliveCells: AliveCells = game.getAliveCells()
    expect(aliveCells).toStrictEqual([])
  })

  test('evolved empty board has no alive cells', () => {
    const game = new Game([])
    const evolved = game.evolve()
    const aliveCells: AliveCells = evolved.getAliveCells()
    expect(aliveCells).toStrictEqual([])
  })

})