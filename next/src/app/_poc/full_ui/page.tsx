"use client"
import React from 'react';
import VisualizationContext from '../components/VisualizationContext';
import Search from '../components/Search';
import Controller from '../components/Controller';
import { useGlobal } from '../components/GlobalContextProvider';


const Context = () => {
  const { stocks } = useGlobal();
  const svg = stocks.at(0)?.svgs?.['6m']
    return (
      <div className=''>
        <div>
          Pre-Header
        </div>
        <Controller />
        <VisualizationContext/>
        <div dangerouslySetInnerHTML={{ __html: svg || '' }} />
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
