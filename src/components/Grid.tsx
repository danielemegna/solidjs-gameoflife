import * as _ from "lodash"
import { Component } from "solid-js"
import { AliveCells, includes } from "../core/AliveCells"
import { Coordinate } from "../core/Coordinate"
import { Boundaries } from "../core/Game"
import styles from "./style.module.css"

interface Props {
  aliveCells: AliveCells
  boundaries: Boundaries
}

const gridSizeRange = (boundaries: Boundaries) => {
  return _.range(
    Math.min(boundaries?.left ?? 0, boundaries?.bottom ?? 0),
    Math.max(boundaries?.right ?? 0, boundaries?.top ?? 0) + 1
  )
}

export const Grid: Component<Props> = (props) => {
  return (
    <table class={styles.gridTable}>
      <tbody>
        {gridSizeRange(props.boundaries).map((y: number) =>
          <tr>
            {gridSizeRange(props.boundaries).map((x: number) => {
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