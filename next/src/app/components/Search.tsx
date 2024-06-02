"use client"
import React from 'react';
import Fuse from 'fuse.js';
import stockList from "../stock_list.json";

const Search = () => {

  const options = {
    keys: ["ticker", "name"],
    includeMatches: true,
    includeScore: true,
    shouldSort: true
  };

  const fuze = new Fuse(stockList, options);

  function search(query: string): stringp[] {
    const = fuse.search(query)

  }

  return (
    <div className='border-2'>
      content
    </div>
  );
};

export default Search;
