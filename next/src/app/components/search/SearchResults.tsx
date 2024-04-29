'use client'
import React from 'react';
import SearchOutput from './SearchOutput';

interface Props {
    results: string[];
}

const SearchResults = ({ results }: Props) => {
    return (
        <div className='flex-1'>
            <div>
                {results && results.map((result, index) => (
                    <SearchOutput key={index} result={result} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
