"use client"
import React, { useState } from 'react';
import Fuse from 'fuse.js';
import stockList from "@/stocks.json";
import { fetchPriceData } from '@/_utils/fetchData';
import { candlestickSVG } from '@/_utils/generateSVG';
import Link from 'next/link';


interface Result {
  ticker: string;
  company: string;
  lastPrice: number;
  graph?: string;
}

const MainSearch: React.FC<{initText:string}> = ({initText})  => {
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

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
    if (value.length > 0) {
      const searchResults = fuse.search(value).slice(0, 5);
      const resultsWithGraphs = await Promise.all(searchResults.map(async (result) => {
        const data = await fetchPriceData(result.item.ticker, '6m', 'close');
        const priceData = data.slice(-30);
        const lastData = priceData[priceData.length - 1];
        const lastPrice = lastData.close_price || 0;
        const graphSVG = candlestickSVG(priceData, 150, 400);
        return {
          ...result.item,
          lastPrice,
          graph: graphSVG
        };
      }));
      setResults(resultsWithGraphs);
    } else {
      setResults([]);
    }
  };

  return (
    <div className='max-w-xl mx-auto flex flex-col items-center'>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder={initText}
        className="text-xl w-full bg-dfYellow outline-none rounded-xl p-1 m-2"
      />
      {results.length > 0 && (
        <div className='flex flex-col'>
          {results.map((result: Result, index: number) => (
            <div key={index} className='flex flex-row justify-between'>
              <div className='flex flex-col w-full border-2 border-dfYellow rounded-xl'>
                <Link href={`/${result.ticker}`}>
                  <div>{result.ticker} - ${result.lastPrice ? result.lastPrice : 'N/A'}</div>
                  <div>{result.company}</div>
                </Link>
              </div>
              <div dangerouslySetInnerHTML={{ __html: result.graph || '' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainSearch;
