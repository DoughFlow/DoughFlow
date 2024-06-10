import React, { useState } from 'react';
import Search from '../components/Search';
import Values from '../components/Values';
import Times from '../components/Times';
import { useGlobal } from '../components/GlobalContextProvider';
import Pencil from '../components/Pencil';
import Trash from '../components/Trash';


const List = () => {
  const { stocks, updateStock, removeStock } = useGlobal();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const startEdit = (index: number): void => {
    setEditingIndex(index);
    setShowEdit(true);
  };

  const cancelEdit = (): void => {
    setEditingIndex(null);
    setShowEdit(false);
  };

  return (
    <div className="flex flex-col">
      {stocks.map((stock, index) => (
        <div key={index} className=''>
          {index === editingIndex && showEdit ? (
            <div className='flex flex-row justify-between'>
              <Search />
              <Values />
              <Times />
              <button onClick={cancelEdit}>Cancel</button>
            </div>
          ) : (
            stock.ticker !== "" && (
              <div className='flex flex-row justify-between max-w-3xl'>
                <div>Ticker: {stock.ticker}</div>
                <div>Name: {stock.company}</div>
                <div>Value: {stock.value}</div>
                <div>Time: {stock.time}</div>
                <Pencil onClick={() => startEdit(index)} />
                <Trash onClick={() => removeStock(index)} />
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default List;
