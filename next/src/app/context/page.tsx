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

  return (
    <div className=''>
      <div>{stocks.length}</div>
      {stocks.map((stock, index) => (
        <div key={index}>
          <div>Ticker: {stock.ticker}</div>
          <div>Value: {stock.value}</div>
          <div>Time: {stock.time}</div>
          <div className=''>Svg: {stock.svg}</div>
          <div onClick={() => dropStock(index)}>remove</div>
        </div>
      ))}

      <div onClick={() => addStock(1)}>add stock in index 1</div>
      <div onClick={() => addStock(2)}>add stock in index 2</div>
      <div onClick={() => addStock(3)}>add stock in index 3</div>
      <div onClick={() => addStock(4)}>add stock in index 4</div>
    </div>
  );
};

export default Context;
