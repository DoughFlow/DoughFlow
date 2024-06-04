"use client"
import React, { useState, FormEvent } from 'react';
import { useGlobal } from './GlobalContextProvider';

interface DataPoint {
  timestamp: string;
  ticker: string;
  open_price: number;
  high_price: number;
  low_price: number;
  close_price: number;
  volume?: number;
}


const VisualizationContext = () => {
  const { stocks, updateStock, resetStocks, removeStock, updateSvg } = useGlobal();
  const [ticker, setTicker] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [svg, setSvg] = useState<string>('');

  const handleUpdateStock = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedStock = { ticker, value, time };
    if (index >= 0 && index < stocks.length) {
      updateStock(index, updatedStock);
      fetchStocks(updatedStock.ticker, updatedStock.value, updatedStock.time)
    } else {
      alert('Invalid index.');
    }
  };

  const generateSvgGraph = (data: DataPoint[]): string  => {
    if (data.length === 0) return ''; // Return an empty string if no data is available.
    const svgWidth = 300;  // Width of the entire SVG
    const svgHeight = 100; // Height of the entire SVG
    const rectWidth = 280; // Width of the rectangle
    const rectHeight = 80; // Height of the rectangle
    const firstDataPoint = data[0]; // Get the first data point
    // Start SVG string
    let svg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">`;
    // Add a white background rectangle
    svg += `<rect width="100%" height="100%" fill="white"/>`;
    // Rectangle coordinates
    const x = 10; // X position for the rectangle
    const y = 10; // Y position for the rectangle
    // Add a rectangle
    svg += `<rect x="${x}" y="${y}" width="${rectWidth}" height="${rectHeight}" fill="none" stroke="black" />`;
    // Add text inside the rectangle, adjusting x and y to center the text approximately
    svg += `<text x="${x + 10}" y="${y + 40}" fill="black" font-size="16" font-family="Arial">`;
    // Compose the display text from the first data point
    svg += `Timestamp: ${firstDataPoint.timestamp}, Ticker: ${firstDataPoint.ticker}, Open Price: ${firstDataPoint.open_price}`;
    // Close text and SVG tags
    svg += `</text></svg>`;
    return svg;
  };

  const fetchStocks = async (ticker:string, value: string, time: string) => {
    try {
      const response = await fetch(`http://3.140.61.213/api/${ticker}/${time}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const jsonData = await response.json();
      const data: DataPoint[] = jsonData.map((dp: any) => ({
        timestamp: dp.timestamp,
        open_price: dp.open_price,
        high_price: dp.high_price,
        low_price: dp.low_price,
        close_price: dp.close_price,
        volume: dp.volume
      }));
      const svg = generateSvgGraph(data);
      updateSvg(0, svg);
      console.log(svg);
    } catch (error) {
      console.error('Failed to fetch or process data:', error);
    }
  };

  const handleUpdateSvg = () => {
    if (index >= 0 && index < stocks.length) {
      updateSvg(index, svg);
    } else {
      alert('Invalid index for SVG update.');
    }
  };

  const handleRemoveStock = () => {
    if (index >= 0 && index < stocks.length) {
      removeStock(index);
    } else {
      alert('Invalid index for removal.');
    }
  };

  const handleResetStocks = () => {
    resetStocks();
  };  
  
  return (
    <div>
      <div>
        <form onSubmit={handleUpdateStock} className='space-y-4'>
          <input
            type="text"
            placeholder="Ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className="border px-2 py-1 bg-black"
          />
          <input
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border px-2 py-1 bg-black"
          />
          <input
            type="text"
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border px-2 py-1 bg-black"
          />

          <div className="flex space-x-2">
            <select
              value={index}
              onChange={(e) => setIndex(parseInt(e.target.value))}
              className="border px-2 py-1 bg-black"
            >
              {Array.from({ length: stocks.length }, (_, i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
            <button type="button" onClick={handleRemoveStock} className="bg-red-500 text-white px-4 py-2">Remove Stock</button>
          </div>

          <div>
            <input
              type="text"
              placeholder="SVG"
              value={svg}
              onChange={(e) => setSvg(e.target.value)}
              className="border px-2 py-1 bg-black"
            />
            <button type="button" onClick={handleUpdateSvg} className="bg-purple-500 text-white px-4 py-2">Update SVG</button>
          </div>

          <button type="button" onClick={handleResetStocks} className="bg-green-500 text-white px-4 py-2 mt-4">Reset Stocks</button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">Update Stock</button>
        </form>
      </div>
    </div>
  );
};

export default VisualizationContext;
