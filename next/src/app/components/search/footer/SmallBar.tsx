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
    <div className='hover-search fixed left-0 top-0  bg-dfwhite rounded p-2 m-2'>
      <input
        type="text"
        className='p-1 border-none outline-none pl-7 focus:outline-none text-dfbrown rounded'
        value={input}
        onChange={handleInputChange}
        placeholder="Search stock tickers..."
      />
    </div>
  );
};

export default SmallBar;
