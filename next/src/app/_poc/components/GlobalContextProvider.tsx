"use client"
import { createContext, useContext, useState, ReactNode } from "react";

export interface Stock {
  ticker: string;
  company: string;
  value: string;
  time: keyof Stock['svgs'];
  svgs: {
    "": string;
    "3m": string;
    "6m": string;
    "1y": string;
    "3y": string;
    "5y": string;
  };
}

type GlobalContextType = {
  stocks: Stock[];
  removeStock: (index: number) => void;
  updateStock: (index: number, updatedStock: Partial<Stock>) => void;
  resetStocks: () => void;
  updateSvg: (index: number, timeframe: keyof Stock['svgs'], updatedSvg: string) => void;
  getStockLayout: () => number;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

type GlobalContextProviderProps = {
  children: ReactNode;
}



export const GlobalContextProvider = ({ children }: GlobalContextProviderProps) => {
  const [stocks, setStocks] = useState<Stock[]>(Array(5).fill({ ticker: "", value: "", time: "", svgs: { "3m": "", "6m": "", "1y":"", "3y":"", "5y":"" }}));
  const [svgEdited, setSvgEdited] = useState<boolean>(false);

  // const renderPreviousSvgs = async (index: number) => {
  //   const height = window.innerHeight;
  //   const width = window.innerWidth;
  //   const layout = getStockLayout();

  //   for (let i = 0; i < index; i++) {
  //     const stock = stocks[i];
  //     if (stock.ticker !== "") {
  //       Object.keys(stock.svgs).forEach(async (time) => {
  //         const updatedSvg = stock.svgs[time];
  //         if (updatedSvg !== "") {
  //           await fetchStocks(i, height, width, layout, stock.ticker, stock.value, stock.time, updateSvg);
  //         }
  //       });
  //     }
  //   }
  // };

  const removeStock = (index: number) => {
    setStocks(prevStocks => {
      const newStocks = [...prevStocks.slice(0, index), ...prevStocks.slice(index + 1)];
      newStocks.push({ ticker: "", company: "",  value: "", time: "" , svgs: {"": "",  "3m": "", "6m": "", "1y":"", "3y":"", "5y":"" }});
      return newStocks;
    });
  };

  const updateStock = (index: number, updatedStock: Partial<Stock>) => {
    if (stocks[index].ticker === "") {
      // renderPreviousSvgs(index);
    }

    setStocks(prevStocks => prevStocks.map((stock, i) => 
      i === index ? {...stock, ...updatedStock} : stock
    ));

  };

  const resetStocks = () => {
    setStocks(prevStocks => [
      prevStocks[0],
      ...Array(4).fill({ ticker: "", company: "", value: "", time: "", svgs: { "3m": "", "6m": "", "1y":"", "3y":"", "5y":"" }})
    ]);
  };

  const updateSvg = (index: number, timeframe: keyof Stock['svgs'], updatedSvg: string): void => {
    setStocks(prevStocks => prevStocks.map((stock, i) => {
      if (i === index) {
        const newSvgs = { ...stock.svgs, [timeframe]: updatedSvg };
        setSvgEdited(true);
        return { ...stock, svgs: newSvgs };
      }
      return stock;
    }));
  };

  const getStockLayout = () => {
      const index = stocks.findIndex(stock => stock.ticker === "");
      if (index === -1) {
          return 4;
      }
      return index - 1;
  };

  const value = {
    stocks, updateStock, resetStocks, removeStock, updateSvg, getStockLayout
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

