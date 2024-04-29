'use client'
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Fuse from 'fuse.js';
import tickers from '@/app/comprehensive_stock_list.json';

const Search = () => {
    const [results, setResults] = useState<string[]>([]);

    const fuse = new Fuse(tickers, {
        keys: ['$path'],
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
        <div className='flex-1 items-center input-border rounded-3xl w-full p-4 mt-16'>
            <SearchBar onSearch={handleSearch} />
            <SearchResults results={results} />
        </div>
    );
};

export default Search;
