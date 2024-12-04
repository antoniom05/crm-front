import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
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

        // Process data for Line Chart
        const dateCounts = data.reduce((acc, doc) => {
          const date = new Date(doc.created_at).toLocaleDateString('en-CA');
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        const labels = Object.keys(dateCounts);
        const values = Object.values(dateCounts);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Documente create',
              data: values,
              fill: true,
              backgroundColor: 'rgba(99, 102, 241, 0.2)',
              borderColor: '#6366F1',
              tension: 0.4,
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
        <h2 className="text-lg font-bold">Documente create în timp</h2>
        <span className="text-gray-500">Ultima perioadă</span>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
