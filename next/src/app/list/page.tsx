"use client"
import React, {useState} from 'react';
import Search from '../components/Search';
import Values from '../components/Values';
import Times from '../components/Times';
import { useGlobal } from '../components/GlobalContextProvider';
import Pencil from '../components/Pencil';
import Trash from '../components/Trash';


const List = () => {
  const { stocks, updateStock, removeStock } = useGlobal();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const startEdit = (index: number): void => {
    setEditingIndex(index);
  };

  const cancelEdit = (): void => {
    setEditingIndex(null);
  };
  return (
    <div className="">
      {stocks.map((stock, index) => (
        index === editingIndex ?
          <div key={index}>
            <Search initialValue={stock.ticker} />
            <Values initialValue={stock.value} />
            <Times initialValue={stock.time} />
            <button onClick={() => cancelEdit()}>Cancel</button>
          </div>
        :
          (stock.ticker !== "" ? 
            <div key={index} className="stock-item">
              <div>Ticker: {stock.ticker}</div>
              <div>Name: {stock.name}</div>
              <div>Value: {stock.value}</div>
              <div>Time: {stock.time}</div>
              <Pencil onClick={() => startEdit(index)} />
              <Trash onClick={() => removeStock(index)} />
            </div> : null)
      ))}
    </div>
  );
};

export default List;
