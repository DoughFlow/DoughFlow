"use client"
import React, { useState, useRef } from "react";
import { useStocks, Stock } from "@C/StockContext";
import stockList from "@/stocks.json";
import Fuse from "fuse.js";
import { Rnd } from "react-rnd";


const UI: React.FC<
  { editor: boolean, click: (event: any)  => void }> = ({editor, click}) => { 
  const [posn, setPosn] = useState<{x: number, y: number}>({x: 50, y: 50});
  interface Result {ticker: string; company: string;}
  
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

    /* Editor onClick functions */
    const TimeOnClick = (time: string) => { updateStock(editIndex, 
      {ticker: Stock.ticker, time: time, value: Stock.value})
      setTimeout(() => {renderPrevious}, 0);
    }
    const ValOnClick = (val: string) => { updateStock(editIndex, 
      {ticker: Stock.ticker, time: Stock.time, value: val})
      setTimeout(() => {renderPrevious}, 0);
    }
    const TickerOnClick = (result: Result) => { updateStock(editIndex,
      {ticker: result.ticker, time: Stock.time, value: Stock.value})
      setTimeout(() => {renderPrevious}, 0);
    }
    const AddStock = () => { updateStock(stocks.length,
      {ticker: stocks[stocks.length-1].ticker, time: stocks[stocks.length-1].time,
      value: stocks[stocks.length-1].value})
      renderPrevious();
    }

    /* SVG-needs to be switched to an import later */
    const dropDownIcon = (<svg className="w-2 h-2 ms-2 mt-[.8rem]"
      aria-hidden="true" 
      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
        strokeWidth="2" d="m1 1 4 4 4-4" /></svg>)

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
            <div key={index} onClick={() => TickerOnClick(result)}>

            <div key={index} className={`border border-dfYellow bg-dfYellow  text-lg
              ${isEven(index)? "bg-opacity-40": "bg-opacity-65"} max-w-[24rem]`}
            >
              {result.ticker} - <br/> {result.company}</div>
            </div>))
            }
        </div>)
        }
      </div>
      );
    }

    const ValueDropDown: React.FC<{}> = ({}) => {

    return (

    <div className="absolute z-10 bg-dfYellow border-2 mt-10">
      <ul className="flex flex-col">
        <li className="flex justify-center cursor-pointer"
            onClick={()=>ValOnClick("vol")}>vol</li>
        <li className="flex justify-center cursor-pointer" 
            onClick={()=>ValOnClick("rsi")}>rsi</li>
        <li className="flex justify-center cursor-pointer"
            onClick={()=>ValOnClick("sma")}>sma</li>
        <li className="flex justify-center cursor-pointer"
            onClick={()=>ValOnClick("price")}>price</li>
      </ul>
    </div>

    );
    }

    const TimeDropDown: React.FC<{}> = ({}) => {

    return (

    <div className="absolute z-10 bg-dfYellow border-2 mt-10">
      <ul className="">
        <li className="flex justify-center cursor-pointer" 
            onClick={()=>TimeOnClick("1m")}>1m</li>
        <li className="flex justify-center cursor-pointer"
            onClick={()=>TimeOnClick("3m")}>3m</li>
        <li className="flex justify-center cursor-pointer"
            onClick={()=>TimeOnClick("6m")}>6m</li>
        <li className="flex justify-center cursor-pointer"
            onClick={()=>TimeOnClick("1y")}>1y</li>
        <li className="flex justify-center cursor-pointer"
            onClick={()=>TimeOnClick("2y")}>2y</li>
      </ul>
    </div>

    );
    }
 
    
    const Entry: React.FC<{index: number}> = ({index}) => {

      const total = stocks.length;
      const setEdit = (index: number) => {
        if (index !== editIndex) {setEditIndex(index)};
        setTimeout(() => {
          setStock({ticker: stocks[index].ticker, time: stocks[index].time,
          value: stocks[index].value}) }, 0);
        setTimeout(() => {if(searchRef.current){searchRef.current.focus();}
        }, 25)}

    if (index < total) {

    return (
    
    <div onClick={()=>setEdit(index)} className={`flex flex-col h-[7rem] 
      bg-dfYellow ${index===editIndex?"bg-opacity-80":"bg-opacity-65"}`}>
      <div className={`
      z-5 flex flex-row
      `}>
        <div className={`flex text-5xl ml-2 mt-1`}>
          { stocks[index].ticker }
        </div>
        <div className={`text-[.5rem] max-w-[7rem] max-h-[1.7rem] overflow-hidden
          mt-6 ml-2`}>
          { }
        </div>
        {index > 0 &&
          (<div onClick={()=>removeAndRender(index)} 
                className={`flex text-xl ml-auto mr-3 cursor-pointer`}
            >x</div>)
        }
      </div>

      <div className={`
      z-5 flex flex-row
      `}>
        <div className={`flex text-2xl mr-auto mt-2 ${index === 0 ||
          index === 3 ? "ml-12" : "ml-4"}`}>
          <button onClick={()=>setTimeDrop(!timeDrop)} className="flex flex-row">
            6m{dropDownIcon}
          </button>
          { editIndex === index && timeDrop && (<TimeDropDown/>) }
        </div>
        <div className={`flex text-2xl ml-auto mt-2 ${index === 0 || index ===
          3 ? "mr-12" : "mr-4"}`}>
          <button onClick={()=>setValDrop(!valDrop)} className="flex flex-row">
            price{dropDownIcon}
          </button>
          { editIndex === index && valDrop && (<ValueDropDown/>) }
        </div>
      </div>

    </div>

    );} else

    {

    return (
    
    <div></div>

    );
    }


    }


    return (
    <div className="absolute text-l top-12 left-6 flex"
      title="Click an entry to alter it.">
      <div className="text-xl mr-2">
        <Search initText={`${" "} editing ${stocks[editIndex].ticker}`}/>
      </div>
      <div className="flex flex-col w-[32rem] h-[14rem]">
        <div className="flex flex-row justify-between">
          <div className={`${stocks.length < 4 ? "w-full" : "w-1/2"}`}>
            <Entry index={0}/>
          </div>
          <div className={`${stocks.length > 3 ? "w-1/2" : ""}`}>
            <Entry index={3}/>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className={`${stocks.length > 4 ? "w-1/3":
            stocks.length > 2 ? "w-1/2" : "w-full"}`}>
            <Entry index={1}/>
          </div>
          <div className={`${stocks.length === 3 ? "w-1/2" : stocks.length === 
            4 ? "w-1/2" : stocks.length === 5 ? "w-1/3" : ""}`}>
            <Entry index={2}/>
          </div>
          <div className={`${stocks.length > 4 ? "w-1/3": ""}`}>
            <Entry index={4}/>
          </div>
        </div>
        </div>
        <div className="absolute ml-[53.5rem] w-[7rem] h-[1rem] mt-12 
          rotate-90 overflow-hidden z-1 cursor-pointer">
          { (stocks.length < 5) && (
              <div className="text-sm border-t border-l border-r
                rounded-t-xl overflow-hidden px-2" onClick={AddStock}>
                Add a stock +
              </div>) }
        </div>
    </div>
    );
  }

return (<div className="absolute"> {editor? <Editor /> : <Button />} </div>);
}
export default UI;
