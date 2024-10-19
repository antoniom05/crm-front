import React from 'react';
import Table from './Table'; // Assuming the Table component is already created
import BarChart from './BarChart'; // Assuming the BarChart component is already created
import LineChart from './LineChart'; // Assuming the LineChart component is already created

const HomePage = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Statistica 1 (Table) */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <Table />
        </div>

        {/* Statistica 2 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Arată</span>
              <select className="border rounded px-3 py-1 text-gray-600">
                <option value="15">15</option>
                <option value="7">7</option>
              </select>
              <span className="text-gray-600">intrări</span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Căutare ..."
                className="border rounded-full px-4 py-2 text-gray-600 w-full md:w-64"
              />
            </div>
          </div>
          <div className="text-gray-500 text-center py-4">
            Nu sunt date valabile pentru a fi afișate
          </div>
        </div>

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
