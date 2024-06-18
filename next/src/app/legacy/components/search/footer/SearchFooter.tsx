'use client'
import React, { useState, useRef } from 'react';
import Fuse from 'fuse.js';
import tickers from '../../../comprehensive_stock_list.json';
import SmallResults from './SmallResults';
import SmallBar from './SmallBar';
import ListWatcher from './ListWatcher';

interface SearchFooterProps {
    results: string[];
    setResults: React.Dispatch<React.SetStateAction<string[]>>;
}

const SearchFooter = ({ results, setResults }: SearchFooterProps) => {
    const fuse = new Fuse(tickers, {
        keys: ['path'],  // Make sure this key aligns with the structure of your 'tickers' data
        includeScore: true,
        threshold: 0.3
    });

    const handleSearch = (query: string) => {
        if (query.trim()) {
            const searchResults = fuse.search(query);
            const mappedResults = searchResults.map(result => result.item);
            setResults(mappedResults.slice(0, 5));
        } else {
            setResults([]);
        }
    };

    return (
        <div className='flex flex-row bg-dfbrown rounded mx-2'>
            <div className='flex-1 flex flex-col w-fit px-2'>
                <SmallBar onSearch={handleSearch} />
                <SmallResults results={results} />
            </div>
            <div>
                <ListWatcher results={results}/>
            </div>
        </div>
    );
};

export default SearchFooter;
