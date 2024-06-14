"use client"
import React from 'react';
import VisualizationContext from '../components/VisualizationContext';
import Search from '../components/Search';
import Controller from '../components/Controller';
import { useGlobal, Stock } from '../components/GlobalContextProvider';
import List from '../components/List';


const Context = () => {
  const { stocks, getStockLayout } = useGlobal();
  const layout = getStockLayout();

  const getSvgContent = (stock: Stock): string => {
    if (stock.svgs && stock.time in stock.svgs) {
      const svgString = stock.svgs[stock.time as keyof typeof stock.svgs] as string; 
      return svgString || '<i>No SVG available</i>';
    }
    return '<i>No SVG available</i>'; // Fallback if key does not exist
  };
    return (
      <div className=''>
        <List />
        <div className='min-h-screen min-w-screen'>
          {layout === 0 && stocks.slice(0, 1).map((stock, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: getSvgContent(stock) }} />
          ))}
          {layout === 1 && 
            <div className='flex flex-col justify-between'>
              {stocks.slice(0, 2).map((stock, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: getSvgContent(stock) }} />
              ))}
            </div>
          }
          {layout === 2 &&
            <div className='flex flex-col'>
              {stocks.slice(0, 1).map((stock, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: getSvgContent(stock) }} />
              ))}
              <div className='flex flex-row'>
                {stocks.slice(1, 3).map((stock, index) => (
                  <div key={index} dangerouslySetInnerHTML={{ __html: getSvgContent(stock) }} />
                ))}
              </div>
            </div>
          }
          {layout === 3 &&
            <div className='flex flex-col'>
              <div className='flex flex-row'>
                {stocks.slice(0, 2).map((stock, index) => (
                  <div key={index} dangerouslySetInnerHTML={{ __html: getSvgContent(stock) }} />
                ))}
              </div>
              <div className='flex flex-row'>
                {stocks.slice(2, 4).map((stock, index) => (
                  <div key={index} dangerouslySetInnerHTML={{ __html: getSvgContent(stock) }} />
                ))}
              </div>
            </div>
          }
          {layout === 4 &&
            <div className='flex flex-col'>
              <div className='flex flex-row'>
                {stocks.slice(0, 2).map((stock, index) => (
                  <div key={index} dangerouslySetInnerHTML={{ __html: getSvgContent(stock) }} />
                ))}
              </div>
              <div className='flex flex-row'>
                {stocks.slice(2, 5).map((stock, index) => (
                  <div key={index} dangerouslySetInnerHTML={{ __html: getSvgContent(stock) }} />
                ))}
              </div>
            </div>
          }
        </div>
        <Controller />
        {stocks.map((stock, index) => (
          <div key={index}>
            <h3>Stock Information</h3>
            <p>Ticker: {stock.ticker}</p>
            <p>Value: {stock.value}</p>
            <p>Time: {stock.time}</p>
            <div>
              <h4>SVGs:</h4>
              {Object.entries(stock.svgs || {}).map(([timeframe, svg]) => (
                <div key={timeframe}>
                  <h5>{timeframe.toUpperCase()}</h5>
                  <div dangerouslySetInnerHTML={{ __html: svg || '<i>No SVG available</i>' }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
};

export default Context;
