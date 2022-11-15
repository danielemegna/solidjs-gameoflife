export type Coordinate = [number, number]

export const equals = ([x1, y1]: Coordinate, [x2, y2]: Coordinate): boolean => {
  return x1 === x2 && y1 === y2
}