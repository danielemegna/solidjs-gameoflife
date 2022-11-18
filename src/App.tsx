import { Component, createSignal, onCleanup } from 'solid-js';
import { Grid } from './components/Grid';
import { AliveCells } from './core/AliveCells';
import { Game } from './core/Game';

const generateRandomInitialState = (aliveCellNumber: number): AliveCells => {
  const result: AliveCells = []
  const min = -10
  const max = 10
  for (let i = 0; i < aliveCellNumber; i++) {
    const x = Math.floor(Math.random() * (max - min) + min)
    const y = Math.floor(Math.random() * (max - min) + min)
    result.push([x, y])
  }
  return result
}

const App: Component = () => {
  const [aliveCells, setAliveCells] = createSignal<AliveCells>(generateRandomInitialState(200));

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
