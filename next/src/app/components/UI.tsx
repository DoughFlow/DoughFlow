"use client"
import React, { useState, useRef, useEffect } from "react";
import { useStocks, Stock } from "@C/StockContext";
import stockList from "@/stocks.json";
import Fuse from "fuse.js";
import { Rnd } from "react-rnd";
import Link from "next/link";


const UI: React.FC<
  { editor: boolean, click: (event: any)  => void }> = ({editor, click}) => { 
  const [posn, setPosn] = useState<{x: number, y: number}>({x: 50, y: 50});
  
  const Button = () => {

  /* Button State */
  const buttonRef = useRef<HTMLDivElement>(null);

  /* Save last button position*/
  const getCurrentPosition = () => {
    if (buttonRef.current) {
      const posn = buttonRef.current.getBoundingClientRect();
      setPosn({x: posn.left, y: posn.top})}
  }

  const wrappedClick = (event: any) => {
    getCurrentPosition();
    click(event);
  }

  /* Styles and defaults for html */
  const resize_config = { top:false, right:false, bottom:false, left:false, 
    topRight:false, bottomRight:false, bottomLeft:false, topLeft:false };
  const buttonPosition = {x: posn.x, y: posn.y, width: 300,
    height: 150};
  const button = `handle relative w-50 h-36 border-2 bg-dfYellow bg-opacity-65
    rounded-e-sm flex items-center justify-center transition-all duration-300
    ease-in-out cursor-move hover:bg-dfYellow`;


  return (
  <Rnd dragHandleClassName="handle" cancel=".cancel-drag"
      enableResizing={resize_config}  default={buttonPosition}
      className="flex items-center justify-center" title="Drag me wherever!"
  >
    <div className={button} ref={buttonRef}>
      <button className=".cancel-drag text-7xl font-extrabold hover:border-b-2"
              onClick={wrappedClick} >
        <span className="text-8xl font-bold">ᗡ</span>
        <span className="text-8xl font-bold">F</span>
      </button>
    </div> 
  </Rnd>
  );
  }

  /* Editor */  
  const Editor = () => {

    interface Stock {ticker: string; time: string; value: string;}
    const { stocks, updateStock, renderPrevious, removeAndRender } = useStocks();
    const [Stock, setStock] = useState<Stock>(stocks[0]);
    const searchRef = useRef<HTMLInputElement>(null);
    const [editIndex, setEditIndex] = useState(0);
    const [timeDrop, setTimeDrop] = useState(false);
    const [valDrop, setValDrop] = useState(false);

    /* Some onClick functions */
    const TimeOnClick = (time: string) => { updateStock(editIndex, 
      {ticker: Stock.ticker, time: time, value: Stock.value})
      setTimeout(() => {renderPrevious}, 0);
    }
    const ValOnClick = (val: string) => { updateStock(editIndex, 
      {ticker: Stock.ticker, time: Stock.time, value: val})
      setTimeout(() => {renderPrevious}, 0);
    }
    const TickerOnClick = (ticker: string) => { updateStock(editIndex,
      {ticker: ticker, time: Stock.time, value: Stock.value})
      setTimeout(() => {renderPrevious}, 0);
    }
    const AddStock = () => { updateStock(stocks.length,
      {ticker: stocks[stocks.length-1].ticker, time: stocks[stocks.length-1].time,
      value: stocks[stocks.length-1].value})
      renderPrevious();
    }

    /* Rest of functions + helper methods */
    function isEven(number: number) { return number % 2 === 0; }

    const Search: React.FC<{initText: string}> = ({initText}) => {
      interface Result {ticker: string; company: string;}

      const [query, setQuery] = useState<string>("");
      const [results, setResults] = useState<Result[]>([]);
      
      const options = {
        keys: ["ticker", "company"],
        includeMatches: true,
        includeScore: true,
        shouldSort: true,
        threshold: 0.3
      }

      const fuse = new Fuse(stockList, options);

      const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { value } = event.target;
        setQuery(value);
        if(value.length > 0) {
          const searchResults = fuse.search(value).slice(0,3);
          setResults(searchResults.map(result => result.item));
        } else {
          setResults([]);
        }
      }


      return (
      <div className="mt-[.05rem]">
        <input
          ref={searchRef}
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder={initText}
          className="text-dfYellow text-4xl w-[24rem] mb-[.5rem]"
        />
        { results.length > 0 && (
        <div className="flex flex-col">
            {results.map((result: Result, index: number) => (
            <div onClick={() => TickerOnClick(result.ticker)}>

            <div className={`border border-dfYellow bg-dfYellow  text-lg
              ${isEven(index)? "bg-opacity-40": "bg-opacity-65"} max-w-[24rem]`}
              key={index}
            >
              {result.ticker} - <br/> {result.company}</div>
            </div>))
            }
        </div>)
        }
      </div>
      );
    }

    const Entry: React.FC<{index: number}> = ({index}) => {

      const dropDownIcon = (
        < svg className="w-2 h-2 ms-2" aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"
        >
          < path stroke="currentColor" strokeLinecap="round" 
            strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" 
          />
        </svg>)

      const total = stocks.length;

      const setEdit = (index: number) => {
        setEditIndex(index)
        setTimeout(() => {setStock({ticker: stocks[index].ticker,
                  time: stocks[index].time,
                  value: stocks[index].value})}, 0);
        setTimeout(() => {if (searchRef.current) {searchRef.current.focus();}
        }, 50);
      }

      if (index < total) {
        return (
          <div onClick={() => setEdit(index)} className={`bg-dfYellow w-full h-full
          flex ${index === editIndex ? "bg-opacity-100" : "bg-opacity-65"} z-5
          `}>
              <div>
              { stocks[index].ticker }
              </div>
              <div className="">
                <button onClick={()=>setTimeDrop(!timeDrop)}>
                  { stocks[index].time }{ dropDownIcon }
                </button>
                { editIndex === index && timeDrop && (
                <div className="absolute z-10 bg-dfYellow">
                  <ul className="">
                    <li onClick={()=>TimeOnClick("6m")} className="cursor-pointer">
                      6m
                    </li>
                    <li onClick={()=>TimeOnClick("1y")} className="cursor-pointer">
                      1y
                    </li>
                    <li title="Experimental Time Range - Caution"
                      onClick={()=>TimeOnClick("5y")} className="cursor-pointer">
                      5y*
                    </li>
                  </ul>
                </div>
                )
                }
              </div>
              <div>
                <button onClick={()=>setValDrop(!valDrop)}>
                  { stocks[index].value }{ dropDownIcon }
                </button>
                { editIndex === index && valDrop && (
                <div className="absolute z-10 bg-dfYellow">
                  <ul className="">
                    <li onClick={()=>ValOnClick("price")} className="cursor-pointer">
                      price
                    </li>
                    <li onClick={()=>ValOnClick("rsi")} className="cursor-pointer">
                      rsi
                    </li>
                    <li onClick={()=>ValOnClick("vol")} className="cursor-pointer">
                      vol
                    </li>
                    <li onClick={()=>ValOnClick("sma")} className="cursor-pointer">
                      sma
                    </li>
                  </ul>
                </div>
                )
                }
              </div>
              <div className="text-3xl ml-auto mb-auto mr-5">
              { index !== 0 &&
                (<button onClick={()=>removeAndRender(index)}>x</button>)
              }
              </div>
          </div>
        );}
      else {
        return (
          <div className=""></div>
        );
      }
    }

    return (
    <div className="absolute text-l top-36 left-36 flex"
      title="Click an entry to alter it.">
      <div className="text-xl mr-2">
        <Search initText={`${" "} editing ${stocks[editIndex].ticker}`}/>
      </div>
      <div className="flex flex-col w-[36rem] h-[14rem]">
        <div className="flex flex-row justify-between flex-grow ">
          <div className={`${stocks.length < 4 ? "w-full" : "w-1/2"}`}>
            <Entry index={0}/>
          </div>
          <div className={`${stocks.length > 3 ? "w-1/2" : ""}`}>
            <Entry index={3}/>
          </div>
        </div>
        <div className="flex flex-row justify-between flex-grow">
          <div className={`${stocks.length > 4 ? "w-1/3":
            stocks.length > 2 ? "w-1/2" : "w-full"}`}>
            <Entry index={1}/>
          </div>
          <div className={`${stocks.length > 2 ? "w-1/2" :
            stocks.length > 4 ? "w-1/3 border-r-2" : ""}`}>
            <Entry index={2}/>
          </div>
          <div className={`${stocks.length > 4 ? "w-1/3": ""}`}>
            <Entry index={4}/>{/**
            {stocks[editIndex].ticker}
            {editIndex}
            {Stock.ticker}
            <button onClick={()=>updateStock(editIndex, 
              {ticker: Stock.ticker, time: Stock.time, value: Stock.value})}
            >
              submiut
            </button>**/}
          </div>
        </div>
        </div>
        <div className="absolute ml-[57.55rem] w-[7rem] h-[1rem] mt-14 
          rotate-90 overflow-hidden z-5 cursor-pointer">
          { (stocks.length < 5) && (
              <div className="text-sm border-t border-l border-r
                rounded-t-xl overflow-hidden px-2" onClick={AddStock}>
                Add a stock +
              </div>) }
        </div>
    </div>
    );
  }

/**
        <div className="flex justify-center">
        { (stocks.length < 5) && (
          <div onClick={AddStock}>
            add a stock
          </div>
        )
        }
        </div>
**/
return (<div className="absolute"> {editor? <Editor /> : <Button />} </div>);
}
export default UI;
