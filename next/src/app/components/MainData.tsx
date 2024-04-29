'use client'
import React, { useEffect, useState } from 'react';
import CandleGraph from './CandleGraph';

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
      <CandleGraph data={dataPoints.map(dp => ({
        timestamp: dp.timestamp,
        open_price: dp.open_price,
        high_price: dp.high_price,
        low_price: dp.low_price,
        close_price: dp.close_price,
        volume: dp.volume
      }))} />
    </div>
  );
};

export default MainData;
