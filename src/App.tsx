import { Component, createSignal } from 'solid-js';
import { Grid} from './components/Grid';

export type Coordinate = [number, number]
export type AliveCells = Coordinate[]

const App: Component = () => {

  const initialState: AliveCells = [
    [0,1],
    [1,1],
    [2,1]
  ]

  const [aliveCells, setAliveCells] = createSignal<AliveCells>(initialState);

  setInterval(() => console.log('tick'), 1000)

  return (
    <Grid height={30} width={30} aliveCells={aliveCells()} />
  );
};

export default App;
