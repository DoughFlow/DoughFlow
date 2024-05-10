"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

interface StockData {
    ticker1: string;
    indicator1: string;
    position1: string;
    ticker2: string;
    indicator2: string;
    position2: string;
};

interface Stock {
    ticker: string;
    indicator: string;
    position: string;
};

type GlobalContextType = {
    stocks: StockData;
    initStock: (ticker: string) => void;
    addStock: (stock: Stock) => void;
    clearStock: () => void;
    editFirstIndicator: (indicator: string) => void;
    editSecondIndicator: (indicator: string) => void;
    editFirstPosition: (position: string) => void;
    editSecondPosition: (position: string) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalInitialStockData = {
    ticker1: "",
    indicator1: "",
    position1: "",
    ticker2: "",
    indicator2: "",
    position2: "",
};

type GlobalContextProviderProps = {
    children: ReactNode;
};

export const GlobalProvider = ({ children }: GlobalContextProviderProps) => {
    const [stocks, setStocks] = useState<StockData>(GlobalInitialStockData);

    const initStock = (ticker: string) => {
        setStocks(prevStocks => ({
            ...prevStocks,
            ticker1: ticker,
            indicator1: "vol",
            position1: "top"
        }));
    };

    const addStock = (stock: Stock) => {
        setStocks(prevStocks => ({
            ...prevStocks,
            ticker2: stock.ticker,
            indicator2: stock.indicator,
            position2: stock.position
        }));
    };


    const clearStock = () => {
        setStocks(prevStocks => ({
            ...prevStocks,
            ticker2: "",
            indicator2: "",
            position2: ""
        }));
    };


    // Easy one-pass indicator functions
    const editFirstIndicator = (indicator: string) => {
        setStocks(prevStocks => ({
            ...prevStocks,
            indicator1: indicator
        }));
    };

    const editFirstPosition = (position: string) => {
        setStocks(prevStocks => ({
            ...prevStocks,
            position1: position
        }));
    };

    const editSecondIndicator = (indicator: string) => {
        setStocks(prevStocks => ({
            ...prevStocks,
            indicator2: indicator
        }));
    };

    const editSecondPosition = (position: string) => {
        setStocks(prevStocks => ({
            ...prevStocks,
            position2: position
        }));
    };

    const value = {
        stocks, addStock, initStock, clearStock, editFirstIndicator, editFirstPosition, editSecondIndicator, editSecondPosition
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
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
