import React from 'react';

// Define an interface for the stock data object
interface StockData {
  timestamp: string;
  ticker: string;
  open_price: string;
  high_price: string;
  low_price: string;
  close_price: string;
  volume: string;
  candle_time: string;
}

function Stocks({ list }: { list: any }) {
  if (!list) {
    return <div>No data available</div>;
  }

  return (
    <ul>
      {list.map((item: object, index: number) => (
        <li key={index}>
          {/* Render each item however you want */}
          {JSON.stringify(item)}
        </li>
      ))}
    </ul>
  );
}
export default Stocks;
