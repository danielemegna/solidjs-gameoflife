import { describe, expect, test } from '@jest/globals'
import { CellState, nextStateFor } from '../../../src/core/rules/StandardEvolutionRule'

describe('dead cell', () => {

    test('stays dead with not enought alive neighbours', () => {
        expect(nextStateFor(CellState.DEAD, 0)).toBe(CellState.DEAD)
        expect(nextStateFor(CellState.DEAD, 1)).toBe(CellState.DEAD)
        expect(nextStateFor(CellState.DEAD, 2)).toBe(CellState.DEAD)
    })

    test('stays dead with more than 3 alive neighbours', () => {
        expect(nextStateFor(CellState.DEAD, 4)).toBe(CellState.DEAD)
        expect(nextStateFor(CellState.DEAD, 5)).toBe(CellState.DEAD)
        expect(nextStateFor(CellState.DEAD, 8)).toBe(CellState.DEAD)
    })

    test('comes alive with exactly 3 alive neighbours', () => {
        expect(nextStateFor(CellState.DEAD, 3)).toBe(CellState.ALIVE)
    })

})

describe('alive cell', () => {

    test('dies with less than 2 alive neighbours', () => {
        expect(nextStateFor(CellState.ALIVE, 0)).toBe(CellState.DEAD)
        expect(nextStateFor(CellState.ALIVE, 1)).toBe(CellState.DEAD)
    })

    test('stays alive with 2 or 3 alive neighbours', () => {
        expect(nextStateFor(CellState.ALIVE, 2)).toBe(CellState.ALIVE)
        expect(nextStateFor(CellState.ALIVE, 3)).toBe(CellState.ALIVE)
    })

    test('dies with more than 3 alive neighbours', () => {
        expect(nextStateFor(CellState.ALIVE, 4)).toBe(CellState.DEAD)
        expect(nextStateFor(CellState.ALIVE, 8)).toBe(CellState.DEAD)
    })


})