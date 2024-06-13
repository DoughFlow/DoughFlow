"use client"
import React, { ReactNode, useState, } from "react";
import { useStocks } from "./StockContext";
import StockEditor from "./StockEditor";

const UI: React.FC<{}> = () => { 

  const [editingIndex, setEditingIndex] = useState(0);
  const { stocks, updateStock } = useStocks();

  const changeEdit = (current: number) => {
    setEditingIndex(current)
  }


  const addStock = () => {
    updateStock(stocks.length, {ticker:"tsla", time: "6m", value: "price"})
    setEditingIndex(stocks.length)
  }
  
 /* Helper function for stock list and editor*/
 const createStockUI = (UI: JSX.Element[]): void => {
    
    for (let i=0; i<stocks.length; i++) {
      UI.push(
        <div className="flex 1">
          <ul className="flex flex-row justify-between">
            <li>
              <button onClick={() => changeEdit(i)}>edit me!</button>
            </li>
            <li>
              stocks(i).ticker
            </li>
            <li>
              stocks(i).time
            </li>
            <li>
              { stocks[i].value }
            </li>
          </ul>
        </div>

      );
    }
  }
  
  let returnValue: JSX.Element[] = []
  createStockUI(returnValue);

  return (

  <div className="p-16">
    I am the list, currently highlighted is: { editingIndex }
    
    <div className="flex">
      
      <div className="flex 1 pr-2">
        <div className="border">
          <StockEditor index={ editingIndex } />
        </div>
      </div>
      
      <div className="flex 1">
        <div>
          { returnValue }
          <div className="flex justify-center">
            { stocks.length < 5 && 
              <button onClick={addStock}>plus</button>
            }
          </div>
        </div>
      </div>

    </div>

  </div>

  );
}

export default UI;
