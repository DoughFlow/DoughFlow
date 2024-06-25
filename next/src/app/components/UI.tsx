"use client"
import React, { useState, useRef } from "react";
import { useStocks, Stock } from "@C/StockContext";
import stockList from "@/stocks.json";
import Fuse from "fuse.js";
import { Rnd } from "react-rnd";

interface Result {ticker: string; company: string;}

const UI: React.FC<
  { editor: boolean, click: (event: any)  => void }> = ({editor, click}) => { 

  /* Function Scoped Variable for Rendering Button */  
  const [posn, setPosn] = useState<{x: number, y: number}>({x: 35, y: 40});

  const Button = () => {

  /* Button State */
  const buttonRef = useRef<HTMLButtonElement>(null);

  /* Save last button position*/
  const getCurrentPosition = () => {
    if (buttonRef.current) {
      const newPosn = buttonRef.current.getBoundingClientRect();
        if (Math.abs(newPosn.left - posn.x) > 40) {
          setPosn({x: newPosn.left, y: newPosn.top})
    }   }
  }

  const wrappedClick = (event: any) => {
    getCurrentPosition();
    click(event);
  }

  /* Navigable .svg + (any other .svg) */ 
  const Icon: React.FC<{w: number, h: number}> = ({w, h}) => {
    
    return (
      <svg fill="#FFE4D1" width={w} height={h} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M1016.4 496.64l-8.48-8.08c-.16-.16-.335-.224-.528-.367L877.648 369.76c-9.344-8.945-24.448-8.945-33.824 0l-5.488 8.064c-9.344 8.945-6.304 23.408 3.04 32.336l76.464 69.344H546.496V106.16l69.343 76.464c8.945 9.344 23.409 12.384 32.336 3.023l8.065-5.471c8.944-9.376 8.944-24.481 0-33.841L543.072 22.368a31.874 31.874 0 0 0-12.32-13.296l-1.423-1.488C524.897 2.912 518.993.576 513.105.608c-5.904-.032-11.776 2.304-16.288 6.976l-8.096 8.463c-.16.16-.176.369-.336.544L372.881 144.335c-8.927 9.329-8.927 24.449 0 33.825l8.065 5.471c8.928 9.344 23.424 6.32 32.368-3.024l69.152-77.105v375.984H106.162l76.464-69.343c9.344-8.945 12.384-23.409 3.04-32.336l-5.471-8.065c-9.36-8.944-24.497-8.944-33.84 0L22.37 482.926a31.957 31.957 0 0 0-13.28 12.29l-1.489 1.423C2.914 501.087.593 506.992.626 512.88c-.016 5.905 2.288 11.777 6.976 16.288l8.464 8.096c.16.16.368.176.528.336l127.744 115.504c9.344 8.928 24.464 8.928 33.84 0l5.472-8.064c9.344-8.945 6.304-23.44-3.04-32.369l-77.12-69.152h379.008v376.96l-69.153-77.103c-8.944-9.344-23.44-12.369-32.368-3.025l-8.064 5.472c-8.928 9.376-8.928 24.496 0 33.824l115.504 127.744c.16.176.192.368.336.528l8.095 8.48c4.512 4.673 10.384 7.009 16.288 6.976 5.873.033 11.777-2.303 16.225-6.975l8.096-8.48c.16-.16.224-.337.368-.529l118.432-129.744c8.944-9.344 8.944-24.464 0-33.824l-8.065-5.488c-8.944-9.344-23.408-6.304-32.335 3.04l-69.344 76.464V543.502H920.48l-77.105 69.152c-9.343 8.944-12.368 23.44-3.024 32.368l5.472 8.064c9.376 8.928 24.496 8.928 33.824 0l127.744-115.504c.176-.175.368-.19.528-.334l8.48-8.096c4.672-4.496 7.008-10.368 6.976-16.288.032-5.857-2.304-11.777-6.975-16.225z"/></svg>
           );
  }

  /* Styles and defaults for html */
  const resize_config = { top:false, right:false, bottom:false, left:false, 
    topRight:false, bottomRight:false, bottomLeft:false, topLeft:false };
  const buttonPosition = {x: posn.x, y: posn.y, width: 10,
    height: 10};

  return (
  <Rnd dragHandleClassName="handle" cancel=".btn"
      enableResizing={resize_config} default={buttonPosition}
      className="handle" title="Drag me wherever!"
  >
  <div className="handle flex items-center justify-center w-[0rem] h-[0rem]
                 border-2 border-dfGray rounded-md cursor-move bg-opacity-0 
                 bg-dfYellow border-opacity-35 sm:desktop-outer-button"
  >
    <div className="z-2">
      <div className="absolute top-2 left-2 opacity-50 hidden sm:block">
        <Icon w={18} h={18}/>
      </div>
      <button className="btn mobile-UI-button w-[3rem] h-[3rem] bg-dfYellow
                        rounded-full bg-opacity-95 sm:desktop-button-styles
                        border-2 border-dfGold border-opacity-25"
              ref={buttonRef}
              onClick={wrappedClick} >
        <div className="sm:h-[3rem]">
          <span className="absolute text-dfWhiteTwo text-[1.5rem] top-[-1.075rem]
            left-[-.33rem] sm:desktop-button-logo-f">F</span>
          <span className="absolute text-dfWhiteTwo top-[-2.25rem] left-[-1.15rem] 
            text-[2.95rem] hover:cursor-not-allowed sm:desktop-button-logo-d">ᗡ</span>
        </div>
      </button>
    </div>
  </div>
  </Rnd>
  );
  }

  /* Editor */  
  const Editor = () => {

    interface Stock {ticker: string; time: string; value: string;}
    const { stocks, updateStock, renderPrevious, removeAndRender, updateCompany } = useStocks();
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
      updateCompany(editIndex, result.company);
    }
    const AddStock = () => { updateStock(stocks.length,
      {ticker: stocks[stocks.length-1].ticker, time: stocks[stocks.length-1].time,
      value: stocks[stocks.length-1].value, company: stocks[stocks.length-1].company})
      renderPrevious();
    }

    /* SVG-needs to be switched to an import later */
    const dropDownIcon = (<svg className="w-2 h-2 ms-2 mt-[1.65rem] ml-1
                                         sm:mt-[.95rem] sm:ml-[.1rem]"
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
          className="text-dfGray pb-[.15rem] mb-[.5rem] border-dfGray
          border-2 bg-dfBlack pl-[.1rem] outline-none w-[20rem]"
        />
        { results.length > 0 && (
        <div className="flex flex-col">
            {results.map((result: Result, index: number) => (
            <div key={index} onClick={() => TickerOnClick(result)}>

            <div key={index} className={`border border-dfYellow bg-dfYellow  text-lg
              ${isEven(index)? "bg-opacity-40": "bg-opacity-65"} max-w-[20rem]`}
            >
              {result.ticker} - <br/> {result.company}</div>
            </div>))
            }
        </div>)
        }
        { results.length === 0 && (
          <div className="hidden sm:user-guide-styles">
            Click a stock in the menu to edit, search using the searchbar to
            find new stocks
          </div>
        )
        }
      </div>
      );
    }

    const ValueDropDown: React.FC<{}> = ({}) => {

    return (

    <div className="absolute z-30 bg-dfYellow border-2">
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

    <div className="absolute z-30 bg-dfYellow border-2">
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
    
    <div onClick={()=>setEdit(index)} className={`flex flex-col h-[5rem] 
      bg-dfYellow ${index===editIndex?"bg-opacity-80":"bg-opacity-90"}
      border-2 border-dfGold border-opacity-20 sm:desktop-entry-styles`}>
      <div className={`flex flex-row`}>
        <div className="absolute text-dfWhiteTwo text-opacity-75 text-[2.35rem] 
                        mt-[.7rem] overflow-hidden z-0 sm:desktop-bg-text
                        cursor-default pointer-events-none">
          { stocks[index].ticker }
        </div>
        <div className="absolute ml-[.3rem] mt-[3.35rem] text-[.75rem]
                        overflow-hidden cursor-default text-overflow-hidden z-0
                        sm:desktop-company-text">
          { stocks[index].company }
        </div>
        {index > 0 &&
          (<div onClick={()=>removeAndRender(index)} 
                className="flex text-md ml-auto mr-1 cursor-pointer
                          sm:desktop-x-text z-10"
            >x</div>)
        }
      </div>

      <div className={`absolute flex flex-row text-dfWhiteTwo text-[2.15rem]
                      text-opacity-75 justify-center items-center mt-[.8rem]
                      ml-[7.5rem] sm:desktop-dropdown-styles`
     }>
        <div className="mx-2 sm:desktop-dropdown-styles-f">
          <button onClick={()=>setTimeDrop(!timeDrop)} className="flex flex-row">
            {stocks[index].time}{dropDownIcon}
          </button>
          { editIndex === index && timeDrop && (<TimeDropDown/>) }
        </div>
        <div className="mx-2 sm:desktop-dropdown-styles-v">
          <button onClick={()=>setValDrop(!valDrop)} className="flex flex-row">
            {stocks[index].value}{dropDownIcon}
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
    <div className="flex flex-col mt-[2.5rem] sm:desktop-ui-layout"
      title="Click an entry to alter it.">
      <div className={`flex order-last text-xl ${stocks[1] ? "mt-[.2rem]" : "mt-[-4.65rem]"}
                      sm:desktop-search-styles`}>
        <div className="flex flex-col items-center">
          <Search initText={`${" "} editing ${stocks[editIndex].ticker}`}/>
        </div>
      </div>
      <div className="flex flex-col w-[20rem] h-[10rem] mr-auto
                     sm:desktop-ui-styles">
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
        <div className="absolute w-[4.5rem] ml-[18.35rem] mt-[1.85rem] rotate-90
                       mb-[1rem] sm:desktop-add-styles">
          { (stocks.length < 5) && (
              <div className={`text-sm sm:text-lg border-t border-l border-r
                rounded-t-xl overflow-hidden px-2 pb-[.1rem] border-dfYellow 
                text-dfGold text-opacity-75
                ${stocks.length > 1 ? "hidden sm:block" : ""}`}
                onClick={AddStock} title="">
                + stock
              </div>) }
        </div>
    </div>
    );
  }

return (<div className="absolute w-full h-full flex flex-col items-center"> {editor? <Editor /> : <Button />} </div>);
}

export default UI;
