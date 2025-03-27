import React, { useEffect, useState } from 'react';
import { CSVLink } from "react-csv";  // Import CSVLink for export
import BarChart from './BarChart';    // BarChart component
import LineChart from './LineChart';  // LineChart component

const HomePage = () => {
  const [isBarChartDataLoaded, setIsBarChartDataLoaded] = useState(false);
  const [isLineChartDataLoaded, setIsLineChartDataLoaded] = useState(false);

  useEffect(() => {
    // Check if the BarChart data is available
    if (window.barChartData) {
      setIsBarChartDataLoaded(true);
    }

    // Check if the LineChart data is available
    if (window.lineChartData) {
      setIsLineChartDataLoaded(true);
    }
  }, []);

  return (

    
    <div className="p-6">

<div className="mt-6">
        {/* Export BarChart Data */}
        {isBarChartDataLoaded && (
          <CSVLink
            data={window.barChartData} // Bar chart data for export
            headers={[
              { label: 'Status', key: 'status' },
              { label: 'Count', key: 'count' }
            ]}
            filename="bar_chart_data.csv"
          >
            <button className="bg-blue-500 text-white py-2 px-4 rounded mb-2">
              Export Bar Chart Data
            </button>
          </CSVLink>
        )}

        {/* Export LineChart Data */}
        {isLineChartDataLoaded && (
          <CSVLink
            data={window.lineChartData} // Line chart data for export
            headers={[
              { label: 'Date', key: 'date' },
              { label: 'Document Count', key: 'count' }
            ]}
            filename="line_chart_data.csv"
          >
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              Export Line Chart Data
            </button>
          </CSVLink>
        )}
      </div>
      
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

      {/* Export Buttons */}
     
    </div>
  );
};

export default HomePage;
