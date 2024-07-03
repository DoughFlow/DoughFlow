"use client"
import React from 'react';
import MainSearch from '@/components/MainSearch';
import "./globals.css";
import Image from "next/image";

const Main = () => {
    return (
    <div className="search-page">
      <div className="search-container border-2 border-dfGold border-opacity-40">
        <h1 className="flex text-[3.25rem] sm:text-[5.75rem] text-dfWhite pb-4
        items-center">
          <a className="drop-shadow-[0_2.3px_1.3px_rgba(0,0,0,0.8)]">DoughFlow</a>
          <a href="/info">
            <Image src="/info.png" alt="Info Page" width={100} height={100}
            className="h-[1.5rem]  w-[1.5rem] ml-[1rem] mt-[.5rem] md:hidden"/>
          </a>
          <a href="/info">
            <Image src="/info.png" alt="Info Page" width={100} height={100}
            className="hidden md:block h-[2.25rem] w-[2.25rem] mt-[1rem] ml-[1rem]"/>
          </a>
        </h1>
        <MainSearch initText='Search a company or ticker' />
      </div>
    </div>
    );
};

export default Main;
