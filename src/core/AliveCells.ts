import { Coordinate, equals } from "./Coordinate";

export type AliveCells = Coordinate[]

export const includes = (aliveCells: AliveCells, coordinate: Coordinate) => {
      return aliveCells.some((x: Coordinate) => equals(x, coordinate))
}