import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ['Titlu 1', 'Titlu 2', 'Titlu 3', 'Titlu 4', 'Titlu 5'],
    datasets: [
      {
        label: 'Ultimele 30 zile',
        data: [12, 19, 3, 5, 2],
        backgroundColor: '#6366F1',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">Statistica 3</h2>
        <span className="text-gray-500">Ultimele 30 zile</span>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
