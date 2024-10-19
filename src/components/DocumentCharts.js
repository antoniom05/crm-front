import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const DocumentCharts = () => {
  const lineData = {
    labels: ['August 21', 'August 22', 'August 23', 'August 24', 'August 25', 'August 26', 'August 27'],
    datasets: [
      {
        label: 'Documente pe zi',
        data: [15, 20, 25, 30, 20, 15, 12],
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99, 102, 241, 0.3)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: ['Închise', 'Deschise'],
    datasets: [
      {
        label: 'Documente după Statut',
        data: [23, 1],
        backgroundColor: ['#10B981', '#EF4444'],
      },
    ],
  };

  return (
    <div className="flex flex-col space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 mb-6">
      {/* Line Chart (Documente pe zi) */}
      <div className="bg-white shadow-md rounded-lg p-4 w-full">
        <h2 className="text-lg font-semibold mb-2">Documente pe zi</h2>
        <Line data={lineData} />
        <div className="flex justify-end mt-2 text-gray-500">Ultimile 7 zile</div>
      </div>

      {/* Bar Chart (Documente după Statut) */}
      <div className="bg-white shadow-md rounded-lg p-4 w-full">
        <h2 className="text-lg font-semibold mb-2">Documente după Statut</h2>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default DocumentCharts;
