"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { fetchPriceData, fetchIndicatorData } from "@/_utils/fetchData";
import {candlestickSVG, barSVG, lineSVG} from "@/_utils/generateSVG";

export interface Stock {
  ticker: string;
  value: string;
  time: string;
  svg?: string; 
};

type newStockType = Omit<Stock, 'svg'>;

type GlobalContextType = {
  stocks: Stock[];
  updateStock: (index: number, newStock: newStockType) => void;
  initStock: (ticker: string) => void;
  renderPrevious: () => Promise<void>;
  removeAndRender: (index: number) => void;
}

const StockContext = createContext<GlobalContextType | undefined>(undefined);


type GlobalContextProviderProps = {
  children: ReactNode;
}

export const StockContextProvider = ({children }: GlobalContextProviderProps) => {
  const [stocks, setStocks ] = useState<Stock[]>([]);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        stocks.forEach((stock, i) => updateStock(i, stock));
      }, 300);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [stocks]);

  const renderPrevious = async (): Promise<void> => {
    stocks.forEach(async (stock, index) => {
      await updateStock(index, {ticker: stock.ticker, value: stock.value, time: stock.time});
    });
  };

  const updateStock = async (index: number, newStock: newStockType) => {
    let localUpdatedStocks: Stock[] = [];
    let svgHeight = 0;
    let svgWidth = 0;
    setStocks(prevStocks => {
      const updatedStocks = [...prevStocks];
      if (index < prevStocks.length) {
        updatedStocks[index] = {...updatedStocks[index], ...newStock};
      } 
      else {
        updatedStocks.push(newStock);
      }
      localUpdatedStocks = updatedStocks
      const sLength = localUpdatedStocks.length;
      const height = window.innerHeight;
      const width = window.innerWidth;
      if (sLength === 0) {
        svgHeight = height;
        svgWidth = width;
      } else if (sLength === 1) {
        svgHeight = height;
        svgWidth = width;
      } else if (sLength === 2) {
        svgHeight = height * 0.5;
        svgWidth = width;
      } else if (sLength === 3) {
        if (index < 1) {
          svgHeight = height * 0.5;
          svgWidth = width;
        } else {
          svgHeight = height * 0.5;
          svgWidth = width * 0.5;
        }
      } else if (sLength === 4) {
        svgHeight = height * 0.5;
        svgWidth = width * 0.5;
      } else if (sLength === 5) {
        if (index === 0 || index === 3) {
          svgHeight = height * 0.5;
          svgWidth = width * 0.5;
        } else {
          svgHeight = height * 0.5;
          svgWidth = Math.floor(width * 0.3333);
        }
      } else {
        svgHeight = height;
        svgWidth = width;
      }
      return updatedStocks;
    });
    if (newStock.value === "price") {
      const data = await fetchPriceData(newStock.ticker, newStock.time, newStock.value);
      const svg = candlestickSVG(data, svgHeight, svgWidth);
      updateSvg(index, svg);
    } else if (newStock.value === "vol") {
      const data = await fetchIndicatorData(newStock.ticker, newStock.time, newStock.value);
      const svg = barSVG(data, svgHeight, svgWidth);
      updateSvg(index, svg);
    } else {
      const data = await fetchIndicatorData(newStock.ticker, newStock.time, newStock.value);
      const svg = lineSVG(data, svgHeight, svgWidth);
      updateSvg(index, svg);
    }
  };

  const updateSvg = (index: number, updatedSvg: string): void => {
    setStocks(prevStocks => {
      if (index < 0 || index >= prevStocks.length) {
        console.error("Index out of bounds: Cannot update SVG.");
        return prevStocks;
      }
      return prevStocks.map((stock, i) => {
        if (i === index) {
          const updatedStock = { ...stock, svg: updatedSvg };
          return updatedStock;
        }
        return stock;
      });
    });
  };

  const removeAndRender = async (index: number) => {
    let localUpdatedStocks: Stock[] = [];
    setStocks(prevStocks => {
        if (index < 0 || index >= prevStocks.length) {
            console.error("Index out of bounds: Cannot remove stock.");
            return prevStocks;
        }
        localUpdatedStocks = [
            ...prevStocks.slice(0, index),
            ...prevStocks.slice(index + 1)
        ];
        return localUpdatedStocks;
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    for (let i = 0; i < localUpdatedStocks.length; i++) {
        const { ticker, value, time } = localUpdatedStocks[i];
        await updateStock(i, { ticker, value, time });
    }
  };

  const initStock = async (ticker: string) => {
    const stock = {ticker: ticker, value: "price", time: "6m"};
    updateStock(0, stock);
    // rando tsts
  };

  const value = {
      stocks, updateStock, initStock, renderPrevious, removeAndRender
  };

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
