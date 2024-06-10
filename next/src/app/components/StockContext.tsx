"use client"
import { createContext, useContext, useState, ReactNode } from "react";
import { fetchData } from "@/_utils/fetchData";
import {candlestickSVG, barSVG, lineSVG} from "@/_utils/generateSVG";

export interface Stock {
  ticker: string;
  value: string;
  time: string;
  svg: string; 
};

type newStockType = Omit<Stock, 'svg'>;

type GlobalContextType = {
  stocks: Stock[];
  // Stock[one stock on call] => updates {stocks: Stock[]} => new svgs
  updateStock: (index: number, newStock: newStockType) => void;
  removeStock: (index: number) => void;
}

const StockContext = createContext<GlobalContextType | undefined>(undefined);


type GlobalContextProviderProps = {
  children: ReactNode;
}

export const StockContextProvider = ({children }: GlobalContextProviderProps) => {

  const [stocks, setStocks ] = useState<Stock[]>([]);

  const updateStock = async (index: number, newStock: newStockType) => {
  
    const data = await fetchData(newStock.ticker, newStock.time, newStock.value);

    const height = window.innerHeight;
    const width = window.innerWidth;
    
    const svg = candlestickSVG(data, height, width);



    // partial<Stock> => Datafetching+Make SVG (_utils?) => return SVG
    //
    // Append this stock to Stock[] if index doesn't exist
    // Update all SVGs (size? and not new data) on append/delete
    // Stock(currentStock) = 
    //    ticker, time, value, company : new data from Partial, 
    //    svg  : new SVG from _utils
  }

  const removeStock = (index: number) => {
    // Remove this stock from Stock[]
    // Update all SVGs (size? and not new data) on append/delete
   
  }

  const initStock = (ticker: string) => {

    const stock = {ticker: ticker, value: "price", time: "6m", svg: ""};

    setStocks([{stock}]);

    stocks[0] = {}

  }

  const value = {
      stocks, updateStock, removeStock
  }

  return (
    <StockContext.Provider value={value} >
      {children}
    </StockContext.Provider>
  );
}

export const useStocks = () => {
  const context = useContext(StockContext);
    if (!context) {
      throw new Error("useStocks must be used within a StockContextProvider");
    }

    return context
}
