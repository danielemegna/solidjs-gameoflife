import { Component, For } from "solid-js"
import { Coordinate, equals } from "../core/Coordinate"
import { AliveCells } from "../core/Game"
import "./style.css"


interface Props {
  height: number
  width: number
  aliveCells: AliveCells
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