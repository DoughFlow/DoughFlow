"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
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
  initStock: (ticker: string) => void;
}

const StockContext = createContext<GlobalContextType | undefined>(undefined);


type GlobalContextProviderProps = {
  children: ReactNode;
}

export const StockContextProvider = ({children }: GlobalContextProviderProps) => {

  // set the stocks ticker value first initially to make sure that the entry in
  // the list exists

  const [stocks, setStocks ] = useState<Stock[]>([]);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      // Optionally, trigger re-rendering of all stock SVGs if needed:
      stocks.forEach((stock, i) => updateStock(i, stock));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [stocks]);

  const updateStock = async (index: number, newStock: newStockType) => {

    const data = await fetchData(newStock.ticker, newStock.time, newStock.value);

    const height = window.innerHeight;
    const width = window.innerWidth;

    const scale = (): [number, number] => {
      const sLength = stocks.length;
      if (sLength === 1) {
        const svgHeight = height * 1;
        const svgWidth = width * 1;
        return [svgHeight, svgWidth]
      } else if (sLength === 2) {
        const svgHeight = height * .5;
        const svgWidth = width * 1;
        return [svgHeight, svgWidth]
      } else if (sLength === 3) {
        if (index < 1) {
          const svgHeight = height * .5;
          const svgWidth = width * 1;
          return [svgHeight, svgWidth]
        } else {
          const svgHeight = height * .5;
          const svgWidth = width * .5;
          return [svgHeight, svgWidth]
        }

      } else if (sLength === 4) {
        const svgHeight = height * .5;
        const svgWidth = width * .5;
        return [svgHeight, svgWidth]
      } else {
        if (index === 0 || index === 3) {
          const svgHeight = height * .5;
          const svgWidth = width * .5;
          return [svgHeight, svgWidth]
        } else {
          const svgHeight = height * .5;
          const svgWidth = Math.floor(width * .3333);
          return [svgHeight, svgWidth]
        }
      }
    }

    const [svgHeight, svgWidth] = scale();
    const svg = candlestickSVG(data, svgHeight, svgWidth);

    const updatedStock: Stock = { ticker: newStock.ticker, time: newStock.time, value: newStock.value,  svg: svg };
    if (index === stocks.length){
      stocks.forEach((stock, i) => updateStock(i, stock));
      stocks.push(updatedStock);
    } else {
      setStocks(prevStocks => prevStocks.map((stock, i) =>
        i === index ? {...stock, ...updatedStock} : stock
      ));
    }


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
    // Update all SVGs (size? and not new data) on append/delet
  };

  const initStock = async (ticker: string) => {
    
    const stockZero = {ticker: ticker, value: "price", time: "6m"};
    const stockOne = {ticker: ticker, value: "price", time: "6m"};
    const stockTwo = {ticker: ticker, value: "vol", time: "6m"};
    const stockThree = {ticker: ticker, value: "price", time: "6m"};
    const stockFour = {ticker: ticker, value: "price", time: "6m"};

    updateStock(0, stockZero);
    updateStock(1, stockOne);
    updateStock(2, stockTwo);
    updateStock(3, stockThree);



  }

  const value = {
      stocks, updateStock, removeStock, initStock
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
