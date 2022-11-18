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
  const initialGame = new Game(generateRandomInitialState(200))
  const [game, setGame] = createSignal<Game>(initialGame)

  const interval = setInterval(() => setGame(game().evolve()), 300)
  onCleanup(() => clearInterval(interval));

  return (<>
    <Grid height={20} width={20} aliveCells={game().getAliveCells()} />
    <pre>Alive cells: {game().getAliveCells().length}</pre>
    <pre>{JSON.stringify(game().getAliveCells())}</pre>
  </>
  );
};

export default App;
