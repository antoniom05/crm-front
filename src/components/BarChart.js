import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const url = 'https://crm.xcore.md/api/documents';
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const { data } = await response.json();

        // Process data for Bar Chart
        const statusCounts = data.reduce((acc, doc) => {
          acc[doc.status] = (acc[doc.status] || 0) + 1;
          return acc;
        }, {});

        const labels = Object.keys(statusCounts);
        const values = Object.values(statusCounts);

        // Set colors dynamically
        const backgroundColors = labels.map((status) => {
          if (status === 'Respins') return '#FEE2E2'; // bg-red-100
          if (status === 'Inchis') return '#D1FAE5'; // bg-green-100
          return '#6366F1'; // Default color
        });

        setChartData({
          labels,
          datasets: [
            {
              label: 'Numărul',
              data: values,
              backgroundColor: backgroundColors,
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) return <p>Loading...</p>;

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">Statutul Documentelor</h2>
        <span className="text-gray-500">Statistica curentă</span>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
