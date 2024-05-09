"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

type GlobalContextType = {
    value: string;
    setValue: (ticker: string) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

type GlobalContextProviderProps = {
    children: ReactNode;
};

export function GlobalProvider( {children}: GlobalContextProviderProps ) {
    const [value, setValue] = useState("");

    const addH = () => 

    return (
        <GlobalContext.Provider value={[value, setValue]}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobal() {
    return useContext(GlobalContext);
}

