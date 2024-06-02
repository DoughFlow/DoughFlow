"use client"
import { createContext, useContext, useState, ReactNode } from "react";

interface Stock {
  ticker: string;
  value: string;
  time: string;
  svg?: string;
}

type GlobalContextType = {
  stocks: Stock[];
  updateStock: (index: number, updatedStock: Stock) => void;
  resetStocks: () => void;
  updateSvg: (index: number, updatedSvg: string) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

type GlobalContextProviderProps = {
  children: ReactNode;
}

export const GlobalContextProvider = ({ children }: GlobalContextProviderProps) => {
  const [stocks, setStocks] = useState<Stock[]>(Array(5).fill({ ticker: "", value: "", time: "", svg: ""}));
  
  const removeStock = (index: number) => {
    setStocks(prevStocks => {
      const newStocks = [...prevStocks.slice(0, index), ...prevStocks.slice(index + 1)];
      newStocks.push({ ticker: "", value: "", time: "" , svg: ""});
      return newStocks;
    });
  };

  const updateStock = (index: number, updatedStock: Omit<Stock, 'svg'>) => {
    // updating a stock triggers the data fetching and the graph building 
    // will put the svg into the context 
    // listener on svg's will control rerender on the visualizations
    // call function that fetches the data
    // data fetching function will call the graph maker 
    // the graph maker will return the svg and then what will enter the svg into
    // the context
    setStocks(prevStocks => prevStocks.map((stock, i) => 
      i === index ? {...stock, ...updatedStock} : stock
    ));

    // trigger the data fetching after the context has been updated with ticker
    // value and time
    console.log("fetching_data")
  };

  const resetStocks = () => {
    setStocks(prevStocks => [
      prevStocks[0],
      ...Array(4).fill({ ticker: "", value: "", time: "" })
    ]);
  };

  function updateSvg(index: number, updatedSvg: string): void {
    setStocks(prevStocks => prevStocks.map((stock, i) => 
      i === index ? {...stock, svg: updatedSvg} : stock
    ));
  };

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

