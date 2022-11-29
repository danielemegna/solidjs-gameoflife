import { Component } from "solid-js"
import { AliveCells, includes } from "../core/AliveCells"
import { Coordinate } from "../core/Coordinate"
import styles from "./style.module.css"

interface Props {
  height: number
  width: number
  aliveCells: AliveCells
}

const generateIndexArrayForLength = (length: number): number[] => {
  const half = Math.floor(length / 2)
  return Array.from(Array(length).keys(), n => n - half)
}

export const Grid: Component<Props> = (props) => {
  return (
    <table class={styles.gridTable}>
      <tbody>
        {generateIndexArrayForLength(props.height).map((x: number) =>
          <tr>
            {generateIndexArrayForLength(props.width).map((y: number) => {
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