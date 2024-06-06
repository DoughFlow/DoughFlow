"use client"
import React, { useState, FormEvent, useContext } from 'react';
import { useGlobal } from './GlobalContextProvider';
import { fetchStocks, getSvgSize } from '../_utils/fetchStocks';

// useSvgListener 
// is a use effect that changes a context to trigger a re render of the graphs
// this will also take the window size and send it to the function makeLayout
// makeLayout will take in a window size and access the stocks global context 
// where the abscence of stocks will show what the layout should be for the
// space

const VisualizationContext: React.FC<
{ onClick: (event: any) => void}> = ({onClick}) => {
  const { stocks, updateStock, resetStocks, removeStock, updateSvg, getStockLayout } = useGlobal();
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
      const height = window.innerHeight;
      const width = window.innerWidth;
      const layout = getStockLayout();
      fetchStocks(index, height, width, layout, updatedStock.ticker, updatedStock.value, updatedStock.time, updateSvg);
    } else {
      alert('Invalid index.');
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
          <button type="button" onClick={onClick} className="bg-red-500 text-white px-4 py-2 mt-4">Exit/ClickOutside!</button>
        </form>
      </div>
    </div>
  );
};

export default VisualizationContext;
