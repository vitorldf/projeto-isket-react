import React from 'react';
import 'leaflet/dist/leaflet.css';
import Home from './screens/Home';
import { MapProvider } from "./context/map";

const App = () => {
  return (
    <MapProvider>
      <Home/>
    </MapProvider>
  );
}

export default App;
