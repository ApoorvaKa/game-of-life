
import './App.css';
import Grid from './ConwaySimulator';

function App() {
  return (
    <div className="App">
      <h1>Game of Life</h1>
      <Grid rows={10} columns={10} />
  

    </div>
  );
}

export default App;
