'use client'
import React, { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const [input, setInput] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className='flex-1 input-border rounded-xl'>
      <input
        type="text"
        className='bg-transpart p-1 border-none outline-none text-4xl'
        value={input}
        onChange={handleInputChange}
        placeholder="Search stock tickers..."
        aria-label="Search stocks"
      />
    </div>
  );
};

export default SearchBar;
