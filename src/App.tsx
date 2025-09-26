import React from 'react';
import ChartPanel from './components/ChartPanel';
import DataPanel from './components/DataPanel';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Chart Panel */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Earthquake Chart
          </h2>
          <ChartPanel/>
        </div>

        {/* Data Panel */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Earthquake Data
          </h2>
          <DataPanel />
        </div>
      </div>
    </div>
  );
};

export default App;
