"use client"
import React, {useState} from 'react';
import { useGlobal } from './GlobalContextProvider';
import Search from './Search';


const Controller = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showSearch1, setShowSearch1] = useState<boolean>(false);
  const [showSearch2, setShowSearch2] = useState<boolean>(false);
  const [showSearch3, setShowSearch3] = useState<boolean>(false);
  const [showSearch4, setShowSearch4] = useState<boolean>(false);
  const [showSearch5, setShowSearch5] = useState<boolean>(false);

  const { stocks, resetStocks, updateStock, updateSvg, removeStock } = useGlobal();


  const toggleDetails = () => setShowDetails(!showDetails);
  const toggleSearch1 = () => setShowSearch1(prev => !prev);
  const toggleSearch2 = () => setShowSearch2(prev => !prev);
  const toggleSearch3 = () => setShowSearch3(prev => !prev);
  const toggleSearch4 = () => setShowSearch4(prev => !prev);
  const toggleSearch5 = () => setShowSearch5(prev => !prev);
  const toggleAllSearch = () => {
    setShowSearch1(false);
  };


  return (
    <div className='flex flex-col text-blue-200 border-2 p-2'>
      <div
        className='p-2 border-2 text-3xl cursor-pointer'
        onClick={toggleDetails}
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </div>
      {showDetails && (
        <div className='flex flex-row justify-between'>
          <div onClick={toggleSearch1} className='cursor-pointer'>
            {showSearch1 ? `${stocks[0].ticker}` : 'Show Search'}
          </div>
          {showSearch1 && (
            <div className=''>
              <Search />
            </div>
          )}
          <div className='border-2 px-6' onClick={toggleAllSearch}>
            and the rest and some more
          </div>
        </div>
      )}
    </div>
  );
};

export default Controller;
