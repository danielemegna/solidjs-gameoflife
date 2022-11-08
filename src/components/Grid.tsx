import { Component, For } from "solid-js"
import { AliveCells, Coordinate } from "../core/Game"
import "./style.css"


interface Props {
  height: number
  width: number
  aliveCells: AliveCells
}

const equals = ([x1, y1]: Coordinate, [x2, y2]: Coordinate): boolean => {
  return x1 === x2 && y1 === y2
}

const generateIndexArrayForLength = (length: number): number[] => {
  const half = Math.floor(length / 2)
  return Array.from(Array(length).keys(), n => n - half)
}

export const Grid: Component<Props> = ({ height, width, aliveCells }) => {
  return (<table>
    <tbody>
      <For each={generateIndexArrayForLength(height) }>{(x) =>
        <tr>
          <For each={generateIndexArrayForLength(width)}>{(y) => {
            const current: Coordinate = [x, y]
            const alive = aliveCells.some((v: Coordinate) => equals(v, current))
            return <td classList={{ alive: alive, dead: !alive }}></td>
          }}</For>
        </tr>
      }</For>
    </tbody>
  </table>)
}