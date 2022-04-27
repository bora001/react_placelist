import Header from "./UI/Header";
import "./App.scss";
import "mapbox-gl/dist/mapbox-gl.css";

import MainMap from "./UI/MainMap";
function App() {
  return (
    <div className="App">
      <Header />
      <MainMap />
      <h2>Placelist</h2>
    </div>
  );
}

export default App;
