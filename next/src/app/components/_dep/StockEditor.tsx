"use client"
import React, { useState} from "react";
import { useStocks } from "./StockContext";
import Search from "./Search";

const dropDownIcon = (<svg className="w-2 h-2 ms-2" aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6" >
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" 
  strokeWidth="2" d="m1 1 4 4 4-4" /></svg>)

const StockEditor: React.FC<{index: number}> = ({index}) => {

  const [time, setTime] = useState("");
  const [value, setValue] = useState("");
  const { stocks } = useStocks();

  const saveSearch: React.FC<{}> = () => {
    
    return (
      <div onClick={saveSearch}>
        <Search initText={"3"}/>
      </div>
    );
  }

  //

  const DropDown: React.FC<{options: string[]}> = ({options}) => {

    return (

      <div className="p-2">{ options[0] }</div>

    );
  }

  return (
    <div>
      <div className="flex justify-evenly">
        <DropDown options={["6m","1y","5y*"]} />
        <DropDown options={["price","rsi","sma", "vol"]} />
      </div>

      <div className="flex justify-center">
        <Search initText={stocks[index].ticker.toUpperCase()}/>
      </div>

    </div>
  );
}

export default StockEditor;

/**
<button 
        id="dropdownButton" 
        onClick={toggleDropdown}
        className="inline-flex items-center focus:outline-none
                   focus:ring-4 focus:ring-dfYellow"
      >
        Time{ dropDownIcon }
      </button>

      {isOpen && (
        <div 
          id="dropdownMenu" 
          className="absolute mt-2 ml-2 z-10 bg-dfYellow"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <a href="#" className="block px-3">Dashboard</a>
            </li>
            <li>
              <a href="#" className="block px-3 py-2">Settings</a>
            </li>
            <li>
              <a href="#" className="block px-3">Earnings</a>
            </li>
          </ul>
        </div>
      )}

const dropDownIcon = (
  <svg className="w-2 h-2 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
  </svg>)

**/
