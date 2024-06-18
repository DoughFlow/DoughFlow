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
    <div className='text-dfwhite'>
      <input
        type="text"
        className='bg-dfbrown focus:border-b border-dfwhite text-dfwhite pl-2 mt-1 focus:outline-none placeholder-dfYellow'
        value={input}
        onChange={handleInputChange}
        placeholder="Create new visualization..."
      />
    </div>
  );
};

export default SmallBar;
