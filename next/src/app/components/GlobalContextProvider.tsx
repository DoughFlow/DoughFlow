"use client"
import { createContext, useContext, useState, ReactNode } from "react";

interface Stock {
  ticker: string;
  value: string;
  time: string;

}

type GlobalContextType = {
  stocks: Stock[];
  updateStock: (index: number, updatedStock: Stock) => void;
  resetStocks: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

type GlobalContextProviderProps = {
  children: ReactNode;
}

export const GlobalContextProvider = ({ children }: GlobalContextProviderProps) => {
  const [stocks, setStocks] = useState<Stock[]>(Array(5).fill({ ticker: "", value: "", time: "" }));
  
  const removeStock = (index: number) => {
    setStocks(prevStocks => 
      prevStocks.map((stock, idx) => idx === index ? { ticker: "", value: "", time: "" } : stock)
    );
  };

  const updateStock = (index: number, updatedStock: Stock) => {
    setStocks(prevStocks => prevStocks.map((stock, i) => i === index ? updatedStock: stock));
  };

  const resetStocks = () => {
    setStocks(prevStocks => [
      prevStocks[0],
      ...Array(4).fill({ ticker: "", value: "", time: "" })
    ]);
  };

  const value = {
    stocks, updateStock, resetStocks, removeStock
  };
  
    return (
      <GlobalContext.Provider value={value} >
        { children }
      </GlobalContext.Provider>
    );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
      if (!context) {
        throw new Error('useGlobal must be used within a GlobalProvider');
    }
    return context;
};

