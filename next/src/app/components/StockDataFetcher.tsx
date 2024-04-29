import React from 'react';
import fetch from 'node-fetch'; // If using Node.js, you can use 'node-fetch' to make HTTP requests

export interface StockData {
  timestamp: string
  ticker: string
  open_price: string
  high_price: string
  low_price: string
  close_price: string
  volume: string
  candle_time: string
}

interface StockDataFetcherProps {
  data: StockData[];
}

const StockDataFetcher: React.FC<StockDataFetcherProps> = ({ data }) => {
  return (
    <div>
      {/* Render the fetched data */}
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export async function getStockData(): Promise<StockData[]> {
  try {
    // Fetch data from an external API or database
    const response = await fetch('your_api_endpoint');
    const data = await response.json();

    // Typecast the fetched data to match the StockData interface
    const stockDataArray: StockData[] = data.map((item: any) => ({
      timestamp: item.timestamp,
      ticker: item.ticker,
      open_price: item.open_price,
      high_price: item.high_price,
      low_price: item.low_price,
      close_price: item.close_price,
      volume: item.volume,
      candle_time: item.candle_time
    }));

    // Return the array of StockData objects
    return stockDataArray;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw new Error('Error fetching stock data');
  }
}

export default StockDataFetcher;

