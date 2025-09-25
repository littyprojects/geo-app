import React from 'react';
import ChartPanel, { type DataPoint } from './components/ChartPanel';
import DataPanel from './components/DataPanel';

const data:DataPoint[] = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

const App = () => {
  return (
    <div>
      <ChartPanel data={data}/>
      <DataPanel/>
    </div>
  )
}

export default App