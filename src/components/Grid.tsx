import { Component, For } from "solid-js"
import { AliveCells } from "../App"
import "./style.css"


interface Props {
  height: number
  width: number
  aliveCells: AliveCells
}

export const Grid: Component<Props> = ({ height, width, aliveCells }) => {
  return (<table>
    <tbody>
      <For each={[...Array(height).keys()]}>{(x) =>
        <tr>
          <For each={[...Array(width).keys()]}>{(y) => {
            //const alive = aliveCells.includes([x,y]) // FIXME
            const alive = Math.floor(Math.random()) == 1
            return <td classList={{ alive: alive, dead: !alive }}></td>
          }}</For>
        </tr>
      }</For>
    </tbody>
  </table>)
}