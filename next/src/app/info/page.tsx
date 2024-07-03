"use client"
import React from 'react';
import "../globals.css";
import Image from "next/image";

const Info = () => {
  return (  
  <div className="bg-dfBlack md:bg-dfWhite">

  <div className="drop-shadow-2xl min-w-screen bg-dfBrown text-[2.25rem]
  text-dfWhite py-[.75rem] flex flex-row justify-center items-center border-b-[.55rem] 
  border-dfGold border-opacity-70 sticky md:desktop-info-header">
    <div>
      DoughFlow
    </div>
    <a href="https://github.com/DoughFlow/DoughFlow" title="Check out our GitHub!">
      <Image src="/github-mark-white.png" alt="GitHub Link" width={40} height={40}
      className="ml-[.55rem] flex md:hidden"/>
      <Image src="/github-mark-white.png" alt="GitHub Link" width={65} height={65}
      className="ml-[.55rem] hidden md:block"/>
    </a>
  </div>

  <div className="flex flex-col mx-[1.25rem] bg-dfBrown bg-opacity-95 pt-4
  px-[.75rem] text-[1.15rem] md:desktop-info-page">
  <h1 className="text-[2rem] md:text-[4rem] w-max px-2 py-1 rounded-sm">
    About Us
  </h1>
  <h2 className="bg-dfWhite bg-opacity-50 px-1 rounded-sm">
    DoughFlow is cross-platform web application for creating complex and
    insightful visualizations of stock data using an intuitive UI.
  </h2>
  <ul className="pt-[.75rem]">
    <li>hi</li>
    <li>hi</li>
    <li>hi</li>
    <li>hi</li>
    <li>hi</li>
    <li>hi</li>
  </ul>

  </div>

  </div>

  );

/***
    return (

    <div className="min-h-screen justify-center flex">
      <div className="border-2 border-dfGold border-opacity-40 flex flex-row
      items-center justify-center bg-dfBrown">
        <h1 className="flex text-[3.25rem] sm:text-[5.75rem] text-dfWhite pb-4
        drop-shadow-2xl">
          DoughFlow
        </h1>
        <a href="https://github.com/DoughFlow/DoughFlow">
          <Image src={githubIcon} alt="Github Link" 
          style={{width: "40%", height: "40%"}} className="ml-3"/>
        </a>
      </div>
      <div className='flex flex-col justify-center bg-dfBrown w-[44rem]'>
        <div className='flex flex-row justify-evenly'>
          <div className='text-dfBlack'>
            Marcus
          </div>
          <div className='text-dfBlack'>
            Ethan  
          </div>
       </div>
       {/***
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
***/
};

export default Info;
