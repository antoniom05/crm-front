import React from 'react';
import Table from './Table'; // Assuming the Table component is already created
import BarChart from './BarChart'; // Assuming the BarChart component is already created
import LineChart from './LineChart'; // Assuming the LineChart component is already created

const HomePage = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Statistica 3 (Bar Chart) */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <BarChart />
        </div>

        {/* Statistica 4 (Line Chart) */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
