"use client"
import React, { useState, useRef, useEffect } from "react";
import { useStocks } from "@C/StockContext";
import stockList from "@/stocks.json";
import { Rnd } from "react-rnd";
import Fuse from "fuse.js";

/* Interfaces & Types */
interface Result { ticker: string; company: string; };

const UI: React.FC<
  { editor: boolean, click: (event: any)  => void }> = ({editor, click}) => { 
  
  /* State & Context- button pos, StockContext, Editor state and input */
  const [editIndex, setEditIndex] = useState(0);
  const [posn, setPosn] = useState<{x: number, y: number}>({x: 50, y: 50});
  const [text, setText] = useState<string>("");
  const buttonRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { stocks } = useStocks();
  const handleUpdate = (event: any) => {setText(event.target.value);}

  /* Button ^/
  /* Gets button position, sets it before calling the actual click func */
  const getCurrentPosition = () => {
    if (buttonRef.current) {
      const posn = buttonRef.current.getBoundingClientRect();
      setPosn({x: posn.left, y: posn.top})
    }
  }

  const wrappedClick = (event: any) => {
    getCurrentPosition();
    click(event);
  }

  /* Button component-renders draggable(Rnd) and button inside */
  const Button = () => {

    const resize_config = { top:false, right:false, bottom:false, left:false, 
      topRight:false, bottomRight:false, bottomLeft:false, topLeft:false };
    const buttonPosition = {x: posn.x, y: posn.y, width: 300,
      height: 150};

    return (
    <Rnd dragHandleClassName="handle" cancel=".cancel-drag"
      enableResizing={resize_config}  default={buttonPosition}
      className="flex items-center justify-center"
    >
      <div className={button} ref={buttonRef}>
        <button className=".cancel-drag text-7xl font-extrabold 
                  hover:border-b-2"
                onClick={wrappedClick} >

          <span className="text-8xl font-bold">ᗡ</span>

          <span className="text-8xl font-bold">F</span>
        </button>
      </div> 
    </Rnd>);
  }
  /* Styles for the div inside the draggable element  */
  const button = `handle relative w-50 h-36 border-2 bg-dfYellow bg-opacity-65
    rounded-e-sm flex items-center justify-center transition-all duration-300
    ease-in-out cursor-move hover:bg-dfYellow`;
  /**
  /* Editor */
  /* Editor Search-collects input to populate returnList*/
  const Search: React.FC<
    {initText: string, handleUpdate: (event: any) => void}> = 
    ({initText, handleUpdate}) => { 

    return (
      <div className="">
        <input
          ref={inputRef}
          size={3}
          type="text"
          onChange={handleUpdate}
          placeholder={initText}
          className="text-dfYellow"
        />
      </div>
    );
  }

  /* Editor Results-Reads input and returns selections */

  /* Editor StockList function-Displays all stocks */
  const createStockList = (StockList: JSX.Element[]): void => {
    console.log("I RAN");

    const handleClick = (i: number) => {
      setEditIndex(i);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }

  for (let i=0; i<stocks.length; i++) {
  StockList.push(
    <div onClick={() => handleClick(i)} className="flex 1 max-w-max">
      <ul className={`${editIndex === i ? "bg-opacity-60" : "bg-opacity-75"}
        bg-dfYellow flex border border-dfYellow rounded-lg  overflow-hidden 
        w-96 h-20`}>
        <li className="mx-8 w-20 flex items-center text-2xl">
          <div>
          { editIndex === i ?
              <input ref={inputRef} onChange={handleUpdate} className="text-dfYellow"></input>
            :
              stocks[i].ticker
          }
          </div>
        </li>
        <li className="mx-10 flex items-center text-2xl">
          { stocks[i].time }
        </li>
       <li className="ml-auto mr-8 flex items-center text-2xl">
          { stocks[i].value }
        </li>
      </ul>
    </div>
  )}
  }

  /* Editor State, useEffects, & Variables */
  let stocksList: JSX.Element[] = [];
  useEffect(() => {
  createStockList(stocksList);
  }, [editor]);

  /* Editor function- bundles all Editor components */
  const Editor = () => {
    return (
      <div className="fit inset-0 flex items-center justify-center m-32 
                      bg-opacity-60 text-xl">
        <div className="flex flex-row">
          <div>
            {text}
          </div>
          <div className="flex flex-col">
            {stocksList}
          </div>
        </div>
      </div>
    );
  }


  /* Final return for UI component-bundles Editor & Button */
  return (
  <div className="absolute">
  { editor? <Editor />
    : <Button />
  }
  </div>
  );
}

export default UI;
