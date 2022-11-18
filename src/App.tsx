import { Component, createSignal, onCleanup } from 'solid-js';
import { Grid } from './components/Grid';
import { AliveCells } from './core/AliveCells';
import { Game } from './core/Game';

const App: Component = () => {

  const initialState: AliveCells = [
    [-4,-5],
    [-5,-5],
    [-6,-5],
    [0, 0],
    [1, 0],
    [2, 0]
  ]

  const [aliveCells, setAliveCells] = createSignal<AliveCells>(initialState);

  const interval = setInterval(
    () => {
      // a new game at every tick not so good ...
      const game = new Game(aliveCells())
      const evolvedGame = game.evolve()
      const newAliveCells = evolvedGame.getAliveCells()
      setAliveCells(newAliveCells)
    },
    300
  );
  onCleanup(() => clearInterval(interval));


  return (
    <Grid height={20} width={20} aliveCells={aliveCells()} />
  );
};

export default App;
