"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { fetchData } from "@/_utils/fetchData";
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
  removeStock: (index: number) => void;
  initStock: (ticker: string) => void;
  renderPrevious: () => void;
}

const StockContext = createContext<GlobalContextType | undefined>(undefined);


type GlobalContextProviderProps = {
  children: ReactNode;
}

export const StockContextProvider = ({children }: GlobalContextProviderProps) => {
  const [stocks, setStocks ] = useState<Stock[]>([]);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      stocks.forEach((stock, i) => updateStock(i, stock));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [stocks]);

  const scale = (index: number): [number, number] => {
    const sLength = stocks.length + 1;
    const height = window.innerHeight;
    const width = window.innerWidth;

    if (sLength === 1) {
      return [height, width];
    } else if (sLength === 2) {
      return [height * 0.5, width];
    } else if (sLength === 3) {
      if (index < 1) {
        return [height * 0.5, width];
      } else {
        return [height * 0.5, width * 0.5];
      }
    } else if (sLength === 4) {
      return [height * 0.5, width * 0.5];
    } else {
      if (index === 0 || index === 3) {
        return [height * 0.5, width * 0.5];
      } else {
        return [height * 0.5, Math.floor(width * 0.3333)];
      }
    }
  };

  const renderPrevious = async () => {
    stocks.forEach((stock, index) => updateStock(index, stock));
  };

  const updateStock = async (index: number, newStock: newStockType) => {

    setStocks(prevStocks => {
      const updatedStocks = [...prevStocks];
      if (index < prevStocks.length) {
        updatedStocks[index] = {...updatedStocks[index], ...newStock};
      } 
      else {
        updatedStocks.push(newStock);
      }
      console.log("Updated Stocks", updatedStocks);
      return updatedStocks;
    });


    const [svgHeight, svgWidth] = scale(index);
    const data = await fetchData(newStock.ticker, newStock.time, newStock.value);

    const svg = candlestickSVG(data, svgHeight, svgWidth);
    updateSvg(index, svg);
    // if (index >= updatedStocks.length) {
    //     // Adding a new stock entry
    //     updatedStocks.push({ ...newStock, svg });
    // } else {
    //     // Updating existing stock entry
    //     updatedStocks[index] = { ...updatedStocks[index], ...newStock, svg };
    // }

    // setStocks(updatedStocks);

    // console.log(stocks);

    // setStocks(prevStocks => prevStocks.map((stock, i) =>
    //   i === index ? {...stock, ...newStock} : stock
    // ));

    // console.log(stocks);
    // const data = await fetchData(newStock.ticker, newStock.time, newStock.value);
    // const [svgHeight, svgWidth] = scale(index);
    // const svg = candlestickSVG(data, svgHeight, svgWidth);
    // console.log(svg);
    // updateSvg(index, svg);
    // console.log(stocks[1]);

    // const updatedStock: Stock = { ticker: newStock.ticker, time: newStock.time, value: newStock.value,  svg: svg };
    // if (index === stocks.length){
    //   stocks.forEach((stock, i) => updateStock(i, stock));
    //   stocks.push(updatedStock);
    // } else {
    //   setStocks(prevStocks => prevStocks.map((stock, i) =>
    //     i === index ? {...stock, ...updatedStock} : stock
    //   ));
    // }

    // partial<Stock> => Datafetching+Make SVG (_utils?) => return SVG
    //
    // Append this stock to Stock[] if index doesn't exist
    // Update all SVGs (size? and not new data) on append/delete
    // Stock(currentStock) = 
    //    ticker, time, value, company : new data from Partial, 
    //    svg  : new SVG from _utils
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
          console.log("svg updated", updatedStock);
          return updatedStock;
        }
        return stock;
      });
    });
  };


  const removeStock = (index: number) => {
    setStocks(prevStocks => {
      if (index < 0 || index >= prevStocks.length) {
        console.error("Index out of bounds: Cannot remove stock.");
        return prevStocks;
      }
      const updatedStocks = [
        ...prevStocks.slice(0, index),
        ...prevStocks.slice(index + 1)
      ];
      console.log("stock removed", updatedStocks);
      return updatedStocks;
    });
  };

  const initStock = async (ticker: string) => {
    
    const stock = {ticker: ticker, value: "price", time: "6m"};
    updateStock(0, stock);
  }

  const value = {
      stocks, updateStock, removeStock, initStock, renderPrevious
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
