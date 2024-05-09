"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

interface StockData {
    ticker: string;
    indicator: string;
    position: string;
}

type GlobalContextType = {
    stocks: StockData[];
    addStock: (stock: StockData) => void;
    updateStock: (index: number, stock: StockData) => void;
    clearStock: () => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

type GlobalContextProviderProps = {
    children: ReactNode;
};

export const GlobalProvider = ({ children }: GlobalContextProviderProps) => {
    const [stocks, setStocks] = useState<StockData[]>([]);

    const addStock = (stock: StockData) => {
        setStocks(prevStocks => [...prevStocks, stock]);
    };

    const updateStock = (index: number, stock: StockData) => {
        const newStocks = [...stocks];
        newStocks[index] = stock;
        setStocks(newStocks);
    };

    const clearStock = () => {
        setStocks([]);
    };

    const value = { stocks, addStock, updateStock, clearStock };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobal must be used within a GlobalProvider');
    }
    return context;
}

