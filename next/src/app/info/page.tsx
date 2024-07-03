"use client"
import React from 'react';
import "../globals.css";

const Info = () => {
    return (
    <div className="bg-dfBrown min-h-screen min-w-screen">
      <div className="border-2 border-dfGold border-opacity-40">
        <h1 className="flex text-[3.25rem] sm:text-[5.75rem] text-dfWhite pb-4">
          DoughFlow
        </h1>
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-row justify-evenly'>
          <div className='text-dfBlack'>
            Marcus
          </div>
          <div className='text-dfBlack'>
            Ethan  
          </div>
       </div>
        <div className='flex flex-row justify-evenly'>
          <div className='text-dfBlack'>
            Aidan
          </div>
          <div className='text-dfBlack'>
            Jack
          </div>
        </div>
      </div>
    </div>
    );
};

export default Info;
