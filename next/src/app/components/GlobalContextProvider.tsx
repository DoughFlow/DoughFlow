"use client"
import { createContext, useContext, useState, ReactNode } from "react";

interface Stock {
  ticker: string;
  value: string;
  time: string;
  svgs?: { "3m"?: string; "6m"?: string, "1y"?: string, "3y"?: string, "5y"?: string };
}

type GlobalContextType = {
  stocks: Stock[];
  removeStock: (index: number) => void;
  updateStock: (index: number, updatedStock: Stock) => void;
  resetStocks: () => void;
  updateSvg: (index: number, timeframe: string, updatedSvg: string) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

type GlobalContextProviderProps = {
  children: ReactNode;
}

export const GlobalContextProvider = ({ children }: GlobalContextProviderProps) => {
  const [stocks, setStocks] = useState<Stock[]>(Array(5).fill({ ticker: "", value: "", time: "", svgs: { "3m": "", "6m": "", "1y":"", "3y":"", "5y":"" }}));
  
  const removeStock = (index: number) => {
    setStocks(prevStocks => {
      const newStocks = [...prevStocks.slice(0, index), ...prevStocks.slice(index + 1)];
      newStocks.push({ ticker: "", value: "", time: "" , svgs: { "3m": "", "6m": "", "1y":"", "3y":"", "5y":"" }});
      return newStocks;
    });
  };

  const updateStock = (index: number, updatedStock: {ticker: string; value: string; time: string;}) => {
    setStocks(prevStocks => prevStocks.map((stock, i) => 
      i === index ? {...stock, ...updatedStock} : stock
    ));
    console.log("Stock updated, fetching data for new SVGs");
  };

  const resetStocks = () => {
    setStocks(prevStocks => [
      prevStocks[0],
      ...Array(4).fill({ ticker: "", value: "", time: "", svgs: { "3m": "", "6m": "", "1y":"", "3y":"", "5y":"" }})
    ]);
  };

  function updateSvg(index: number, timeframe: string, updatedSvg: string): void {
    setStocks(prevStocks => prevStocks.map((stock, i) => {
      if (i === index) {
        switch (timeframe) {
          case "3m":
            return { ...stock, svgs: { ...stock.svgs, "3m": updatedSvg } };
          case "6m":
            return { ...stock, svgs: { ...stock.svgs, "6m": updatedSvg } };
          case "1y":
            return { ...stock, svgs: { ...stock.svgs, "1y": updatedSvg } };
          case "3y":
            return { ...stock, svgs: { ...stock.svgs, "3y": updatedSvg } };
          case "5y":
            return { ...stock, svgs: { ...stock.svgs, "5y": updatedSvg } };
          default:
            console.error("Incorrect timeframe provided:", timeframe);
            return stock;
        }
      }
      return stock;
    }));
  }
  const value = {
    stocks, updateStock, resetStocks, removeStock, updateSvg
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

