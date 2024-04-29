'use client'
import React, { useState } from 'react';
import Fuse from 'fuse.js';
import tickers from '@/comprehensive_stock_list.json';
import SmallResults from './SmallResults';
import SmallBar from './SmallBar';
import ListWatcher from './ListWatcher';

const SearchFooter: React.FC = () => {
    const [results, setResults] = useState<string[]>([]);

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
        <div className='flex flex-row border-t p-4 min-h-fit focus-within:min-h-[18.5rem] focus-within:max-h-[18.5rem]'>
            <div className='flex-1 items-center input-border rounded-3xl p-4 max-w-sm'>
                <SmallBar onSearch={handleSearch} />
                <SmallResults results={results} />
            </div>
            <div className='flex-1 p-4 max-h-full'>
                <ListWatcher results={results} />
            </div>
        </div>
    );
};

export default SearchFooter;
