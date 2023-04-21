import { Component, createSignal, onCleanup } from 'solid-js';
import { Grid } from './components/Grid';
import { AliveCells } from './core/AliveCells';
import { Game } from './core/Game';

const generateRandomInitialState = (aliveCellNumber: number): AliveCells => {
  const result: AliveCells = []
  const min = -20
  const max = 20
  for (let i = 0; i < aliveCellNumber; i++) {
    const x = Math.floor(Math.random() * (max - min) + min)
    const y = Math.floor(Math.random() * (max - min) + min)
    result.push([x, y])
  }
  return result
}

const glider = (): AliveCells => {
  return [
    [0,0],
    [1,0],
    [2,0],
    [2,1],
    [1,2],
  ] as AliveCells
}

const pulsar = (): AliveCells => {
  return [
    [2,0], [3,0], [4,0],
    [0,2], [0,3], [0,4],
    [5,2], [5,3], [5,4],
    [2,5], [3,5], [4,5],

    [8,0], [9,0], [10,0],
    [7,2], [7,3], [7,4],
    [12,2], [12,3], [12,4],
    [8,5], [9,5], [10,5],

    [2,7], [3,7], [4,7],
    [0,8], [0,9], [0,10],
    [5,8], [5,9], [5,10],
    [2,12], [3,12], [4,12],

    [8,7], [9,7], [10,7],
    [7,8], [7,9], [7,10],
    [12,8], [12,9], [12,10],
    [8,12], [9,12], [10,12],
  ] as AliveCells
}

const tryToBetterRenderThis = (): AliveCells => {
  return [
    [-10,0],
    [-10,-1],
    [-11,-1],
    [-11,0],
    ...glider()
  ] as AliveCells
}

const App: Component = () => {
  const initialGame = new Game(generateRandomInitialState(500))
  const [game, setGame] = createSignal<Game>(initialGame)

  const interval = setInterval(() => setGame(game().evolve()), 300)
  onCleanup(() => clearInterval(interval));

  return (<>
    <Grid boundaries={game().getBoundaries()} aliveCells={game().getAliveCells()} />
    <pre>
      Alive cells: {game().getAliveCells().length} \n
      Boundaries: {JSON.stringify(game().getBoundaries())} \n
{/*       Cells: {JSON.stringify(game().getAliveCells())} */}
    </pre>
  </>
  );
};

export default App;
