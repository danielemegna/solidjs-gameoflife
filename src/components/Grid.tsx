import { Component, For } from "solid-js"
import { AliveCells, Coordinate } from "../App"
import "./style.css"


interface Props {
  height: number
  width: number
  aliveCells: AliveCells
}

const equals = ([x1, y1]: Coordinate, [x2, y2]: Coordinate): boolean => {
  return x1 === x2 && y1 === y2
}

export const Grid: Component<Props> = ({ height, width, aliveCells }) => {
  return (<table>
    <tbody>
      <For each={[...Array(height).keys()]}>{(x) =>
        <tr>
          <For each={[...Array(width).keys()]}>{(y) => {
            const current: Coordinate = [x,y]
            const alive = aliveCells.some((v) => equals(v, current))
            return <td classList={{ alive: alive, dead: !alive }}></td>
          }}</For>
        </tr>
      }</For>
    </tbody>
  </table>)
}