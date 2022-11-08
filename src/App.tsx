import { Component, createSignal } from 'solid-js';
import { Grid } from './components/Grid';
import { AliveCells } from './core/Game';

const App: Component = () => {

  const initialState: AliveCells = [
    [0, 0],
    [1, 0],
    [2, 0]
  ]

  const [aliveCells, setAliveCells] = createSignal<AliveCells>(initialState);

  setInterval(() => console.log('tick'), 1000)

  return (
    <Grid height={20} width={20} aliveCells={aliveCells()} />
  );
};

export default App;
