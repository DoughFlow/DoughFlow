"use client"
import { createContext, useContext, useState, ReactNode } from "react";
import fetchData from "@/_utils/fetchData";
import generateSVG from "@/_utils/generateSVG";

export interface Stock {
  ticker: string;
  company: string;
  value: string;
  time: string;
  svg: string; 
};

type GlobalContextType = {
  stocks: Stock[];
  // Stock[one stock on call] => updates {stocks: Stock[]} => new svgs
  updateStock: (index: number, newStock: Partial<Stock>) => void;
  removeStock: (index: number) => void;
}

const StockContext = createContext<GlobalContextType | undefined>(undefined);


type GlobalContextProviderProps = {
  children: ReactNode;
}

export const StockContextProvider = ({children }: GlobalContextProviderProps) => {

  const [stocks, setStocks ] = useState<Stock[]>([]);

  const updateStock = (index: number, newStock: Partial<Stock>) => {
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
