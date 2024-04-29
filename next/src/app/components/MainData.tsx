'use client'
import React, { useEffect, useState } from 'react';

interface MainDataProps {
  ticker: string;
}

interface DataPoint {
  timestamp: string;
  ticker: string;
  open_price: number;
  high_price: number;
  low_price: number;
  close_price: number;
  volume: number;
  candle_time: string;
}

const MainData = ({ ticker }: MainDataProps) => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

  useEffect(() => {
    const getPreviewData = async () => {
      const response = await fetch(`http://3.140.61.213/api/${ticker}/6m`);
      const data = await response.json();
      setDataPoints(data);
    };

    if (ticker) {
      getPreviewData();
    }
  }, [ticker]);

  return (
    <div>
      <div>
        {/* Rendering data points as a list of div elements */}
        {dataPoints.map((data, index) => (
          <div key={index}>
            <p>Date: {data.timestamp}</p>
            <p>Ticker: {data.ticker}</p>
            <p>Open: {data.open_price}</p>
            <p>High: {data.high_price}</p>
            <p>Low: {data.low_price}</p>
            <p>Close: {data.close_price}</p>
            <p>Volume: {data.volume}</p>
            <p>Candle Time: {data.candle_time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainData;
