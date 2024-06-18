import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface GraphProps {
  dataPoints: number[];
}

const SearchGraph = ({ dataPoints }: GraphProps) => {
  const getLineColor = (dataPoints: number[]): string => {
    if (dataPoints.length < 2) return 'rgb(128, 128, 128)'; // Default to gray if not enough points to compare
    const firstPoint = dataPoints[0];
    const lastPoint = dataPoints[dataPoints.length - 1];
    if (firstPoint < lastPoint) {
      return 'rgb(0, 128, 0)'; // Green
    } else if (firstPoint > lastPoint) {
      return 'rgb(255, 0, 0)'; // Red
    } else {
      return 'rgb(128, 128, 128)'; // Grey
    }
  };

  const data = {
    labels: Array(dataPoints.length).fill(''), // Empty labels for no X axis
    datasets: [
      {
        label: 'Outline',
        data: dataPoints,
        borderColor: '#FFBB84', // White color for the outline
        borderWidth: 2, // Slightly larger border width for the outline effect
        fill: false,
        pointRadius: 0,
        borderCapStyle: 'round' as CanvasLineCap,
      },
      {
        label: 'Main Line',
        data: dataPoints,
        borderColor: getLineColor(dataPoints),
        borderWidth: 6,
        fill: false,
        pointRadius: 0,
        borderCapStyle: 'round' as CanvasLineCap,
      }
    ],
  };

  const options = {
    scales: {
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className='mt-4 mr-4'>
      <Line data={data} options={options} />
    </div>
  );
};

export default SearchGraph;

