"use client"
import React, { useState } from 'react';
import { useStocks } from './StockContext';
import Search from '@C/Search';


const List = () => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const { stocks, updateStock, removeAndRender } = useStocks();

  const startEdit = (index: number): void => {
    setEditingIndex(index);
    setShowEdit(true);
  };

  const cancelEdit = (): void => {
    setEditingIndex(null);
    setShowEdit(false);
  };

  const addStock = (index: number): void => {
    const newStock = {ticker: "TSLA", value: "price", time: "6m"};
    updateStock(index, newStock);
  };

    return (
    <div className="flex flex-col">
      <div>
        <div>{stocks.length}</div>
        {stocks.map((stock, index) => (
          <div key={index}>
            <div>Ticker: {stock.ticker}</div>
            <div>Value: {stock.value}</div>
            <div>Time: {stock.time}</div>
            <div>{stock.svg ? 'Svg: true' : 'Svg is empty'}</div>
          </div>
        ))}
      </div>
      {stocks.map((stock, index) => (
        <div key={index} className=''>
          {index === editingIndex && showEdit ? (
            <div className='flex flex-row justify-between'>
              <Search initText='beast'/>
              <div>
                Dropdown for value
              </div>
              <div>
                Dropdown for time
              </div>
              <div onClick={cancelEdit}>
              </div>
            </div>
          ) : (
            stock.ticker !== "" && (
              <div className='flex flex-row justify-between max-w-3xl'>
                <div>Ticker: {stock.ticker}</div>
                <div>Value: {stock.value}</div>
                <div>Time: {stock.time}</div>
                <div onClick={() => startEdit(index)}> Pencil </div>
                <div onClick={() => removeAndRender(index)}> Trash </div>
              </div>
            )
          )}
          { index < 4 && <div onClick={() => addStock(index)}>plus</div>}
        </div>
      ))}
    </div>
    );
};

export default List;
