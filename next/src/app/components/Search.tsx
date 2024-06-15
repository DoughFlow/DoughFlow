"use client"
import React, {useState} from 'react';
import Fuse from 'fuse.js';
import stockList from "@/stocks.json";


interface Result {
  ticker: string;
  company: string;
}

const Search: React.FC<{initText:string}> = ({initText})  => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Result[]>([]);

  const options = {
    keys: ["ticker", "company"],
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
      const searchResults = fuse.search(value).slice(0, 5);  // Limit to top 3 results
      setResults(searchResults.map(result => result.item));
    } else {
      setResults([]);
    }
  };

  return (
    <div className=''>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder={initText}
        className="text-black"
      />
      {results.length > 0 && (
        <ul>
          {results.map((result: Result, index: number) => (
            <li key={index}>{result.ticker} - {result.company}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
