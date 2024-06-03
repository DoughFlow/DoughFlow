"use client"
import React, {useState} from 'react';
import Fuse from 'fuse.js';
import stockList from "../stock_list.json";


interface Result {
  ticker: string;
  name: string;
}

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Result[]>([]);

  const options = {
    keys: ["ticker", "name"],
    includeMatches: true,
    includeScore: true,
    shouldSort: true,
    threshold: 0.3
  };

  const fuse = new Fuse(stockList, options);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
    if (value.length > 0) {
      const searchResults = fuse.search(value).slice(0, 3);  // Limit to top 3 results
      setResults(searchResults.map(result => result.item));
    } else {
      setResults([]);
    }
  };

  return (
    <div className='border-2'>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a stock..."
        className="mb-2 bg-black"
      />
      {results.length > 0 && (
        <ul>
          {results.map((result: Result, index: number) => (
            <li key={index}>{result.ticker} - {result.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
