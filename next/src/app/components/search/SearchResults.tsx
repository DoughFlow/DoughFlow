'use client'
import React from 'react';
import SearchCard from './SearchCard';

interface Props {
    results: string[];
}

const SearchResults = ({ results }: Props) => {
    return (
        <div className='mt-4'> {/* Added margin top for spacing below the search bar */}
            {results.length > 0 && (
                <div className='flex flex-col items-center space-y-4'> {/* Centered column layout with spacing between rows */}
                    <div className="flex justify-center space-x-4"> {/* First row of 3 cards */}
                        {results.slice(0, 3).map((result, index) => (
                            <SearchCard key={index} result={result} />
                        ))}
                    </div>
                    <div className="flex justify-center space-x-4"> {/* Second row of 2 cards */}
                        {results.slice(3, 5).map((result, index) => (
                            <SearchCard key={index} result={result} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
