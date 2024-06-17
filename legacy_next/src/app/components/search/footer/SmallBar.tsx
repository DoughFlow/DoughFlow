'use client'
import React, { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

const SmallBar = ({ onSearch }: Props) => {
  const [input, setInput] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className='flex-1 focus-within:border-b'>
      <input
        type="text"
        className='bg-transpart p-1 border-none outline-none w-full'
        value={input}
        onChange={handleInputChange}
        placeholder="Search stock tickers..."
        aria-label="Search stocks"
      />
    </div>
  );
};

export default SmallBar;
