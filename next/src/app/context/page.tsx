"use client"
import React, { useEffect, useRef } from 'react';
import { useStocks } from '@/components/StockContext';

const Context = () => {
    const { stocks, initStock, updateStock, renderPrevious, removeAndRender } = useStocks();
    useEffect(() => {
      initStock("aapl");
    }, []);

    const addStock = (index: number) => {
      const newStock = {ticker: "amzn", value: "price", time: "1y"};
      updateStock(index, newStock);
      renderPrevious();
    };

  const dropStock = async (index: number) => {
    removeAndRender(index);
  };

  const renderStockSVG = (index: number) => {
    if (index < stocks.length && stocks[index] && stocks[index].svg) {
      return (
        <div dangerouslySetInnerHTML={{__html: stocks[index].svg || ""}} />
      );
    }
    return null; // Return null or some fallback component if stock doesn't exist
  };


  return (
    <div>
      <div className='z-50 absolute top-0 left-0'>
        <div>{stocks.length}</div>
        {stocks.map((stock, index) => (
          <div key={index}>
            <div>Ticker: {stock.ticker}</div>
            <div>Value: {stock.value}</div>
            <div>Time: {stock.time}</div>
            <div className=''>Svg: {stock.svg?.slice(0,30)}</div>
            <div onClick={() => dropStock(index)}>remove</div>
          </div>
        ))}

        <div onClick={() => addStock(1)}>add stock in index 1</div>
        <div onClick={() => addStock(2)}>add stock in index 2</div>
        <div onClick={() => addStock(3)}>add stock in index 3</div>
        <div onClick={() => addStock(4)}>add stock in index 4</div>
      </div>
      <div className="flex flex-col min-h-screen min-w-screen m-0 z-0">
        <div className="flex flex-row">
          {renderStockSVG(0)}
          {renderStockSVG(3)}
        </div>

        <div className="flex flex-row">
          {renderStockSVG(1)}
          {renderStockSVG(2)}
          {renderStockSVG(4)}
        </div>
      </div>
    </div>
  );
};

export default Context;
