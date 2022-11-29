import { Component } from "solid-js"
import { AliveCells, includes } from "../core/AliveCells"
import { Coordinate } from "../core/Coordinate"
import { Boundaries } from "../core/Game"
import styles from "./style.module.css"
import * as _ from "lodash"

interface Props {
  aliveCells: AliveCells
  boundaries: Boundaries
}

export const Grid: Component<Props> = (props) => {
  const gridSize = () => {
    return _.range(
      Math.min(props.boundaries?.left ?? 0, props.boundaries?.bottom ?? 0),
      Math.max(props.boundaries?.right ?? 0, props.boundaries?.top ?? 0)
    )
  }
  return (
    <table class={styles.gridTable}>
      <tbody>
        {gridSize().map((y: number) =>
          <tr>
            {gridSize().map((x: number) => {
              const current: Coordinate = [x, y]
              const alive = includes(props.aliveCells, current)
              return <td classList={{ [styles.aliveCell]: alive, [styles.deadCell]: !alive }}></td>
            })}
          </tr>
        )}
      </tbody>
    </table>
  )
}