"use client"
import React, { useState, FormEvent } from 'react';
import { useGlobal } from './GlobalContextProvider';
import * as d3 from 'd3';

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

  const generateSvgGraph = (data: DataPoint[]): string => {
    if (data.length === 0) return '';

    const svgWidth = 600;
    const svgHeight = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };

    // Manual parsing and scaling
    const parseDate = (dateStr: string): number => new Date(dateStr).getTime();
    const timestamps = data.map(dp => parseDate(dp.timestamp));
    const closePrices = data.map(dp => dp.close_price);
    const xMin = Math.min(...timestamps);
    const xMax = Math.max(...timestamps);
    const yMin = Math.min(...closePrices);
    const yMax = Math.max(...closePrices);

    const xScale = (x: number) => ((x - xMin) / (xMax - xMin)) * (svgWidth - margin.left - margin.right) + margin.left;
    const yScale = (y: number) => svgHeight - margin.bottom - ((y - yMin) / (yMax - yMin)) * (svgHeight - margin.top - margin.bottom);

    // Create SVG with D3
    const svg = d3.create("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .attr("xmlns", "http://www.w3.org/2000/svg");

    svg.append("rect") // Background
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "white");

    // Generate path data manually
    let pathD = "M" + xScale(timestamps[0]) + " " + yScale(closePrices[0]);
    timestamps.forEach((timestamp, index) => {
      pathD += " L" + xScale(timestamp) + " " + yScale(closePrices[index]);
    });

    svg.append("path") // Add the path with D3
      .attr("d", pathD)
      .attr("stroke", "steelblue")
      .attr("fill", "none")
      .attr("stroke-width", 2);

    const svgNode = svg.node();
    if (svgNode === null) {
      console.error("Failed to create SVG node");
      return '';
    }

    return svgNode.outerHTML;
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
      updateSvg(0, "6m", svg)
      console.log(svg);
    } catch (error) {
      console.error('Failed to fetch or process data:', error);
    }
  };

  const handleUpdateSvg = () => {
    if (index >= 0 && index < stocks.length) {
      updateSvg(index, "6m", svg)
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
