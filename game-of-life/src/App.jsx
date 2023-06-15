import ConwaySimulator from './ConwaySimulator';
import Slider from './Slider';
import "./App.css"

function App() {
  return (
    <div>
      <h1 className='App-header'>Conway's Game of Life Visualization</h1>
      <ConwaySimulator />
    </div>
  );
}

export default App;
