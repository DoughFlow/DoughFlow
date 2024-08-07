"use client"
import React, { useState } from "react";
import Fuse from "fuse.js";
import stockList from "@/stocks.json";
import { useStocks } from "@C/StockContext";
import { fetchPriceData } from "@/_utils/fetchData";
import Link from "next/link";
import { searchPriceSvg } from "@/_utils/svg/SearchCandle";
import { useRouter } from "next/navigation";

interface Result {
  ticker: string;
  company: string;
  lastPrice: number;
  graph?: string;
}

const MainSearch: React.FC<{initText:string}> = ({initText})  => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Result[]>([]);
  const { stocks, updateCompany } = useStocks();
  const router = useRouter();

  const handleClick = (result: Result) => {
    updateCompany(0, result.company)
    setTimeout(() => { router.push(`/${result.ticker}`) }, 70);
  }

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
        const data = await fetchPriceData(result.item.ticker, "1m", "close");
        const priceData = data.slice(-14);
        const lastData = priceData[priceData.length - 1];
        const lastPrice = lastData.close_price || 0;
        let graphSVG = searchPriceSvg(priceData, 150, 400);
        if (640 > window.innerWidth) {
          graphSVG = searchPriceSvg(priceData, 100, 225);
        }

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
    <div className="flex flex-col justify-center items-center w-[20rem] sm:w-[36rem] select-none cursor-pointer">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder={" " + initText}
        className="border-2 border-dfGray rounded-2xl bg-dfGray text-dfBlack
                  text-2xl sm:text-4xl outline-dfBrown bg-opacity-80 pl-[1rem]
                  w-[22rem] sm:w-[38rem] pb-1 mb-2 outline-none"
      />
      {results.length > 0 && (
        <div className="flex flex-col w-[22rem] sm:w-[42rem]">
          {results.map((result: Result, index: number) => (
            <div onClick={()=>handleClick(result)} key={index} className="
              flex flex-row justify-between border-t-2 border-t-dfyellow py-2 bg-dfBlack
              rounded-md">
              <div className="flex items-center text-sm sm:text-xl">
                <div>
                  <div className="m-2 text-dfyellow">{result.company}</div>
                </div>
              </div>
              <div className="mr-4" dangerouslySetInnerHTML={{ __html: result.graph || "" }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainSearch;
