'use client'
import React, { useState } from 'react';
import Fuse from 'fuse.js';
import tickers from '@/comprehensive_stock_list.json';
import SmallResults from './SmallResults';
import SmallBar from './SmallBar';


const Search = () => {
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
        <div>
            <SmallBar onSearch={handleSearch} />
            <SmallResults results={results} />
        </div>
    );
};

export default Search;
