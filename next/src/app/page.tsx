"use client"
import React from 'react';
import MainSearch from '@/components/MainSearch';
import "./globals.css";

const Main = () => {
    return (
    <div className="search-page">
      <div className="search-container border-2 border-dfGold border-opacity-40">
        <h1 className="flex text-[3.25rem] sm:text-[5.75rem] text-dfWhite pb-4">
          DoughFlow
        </h1>
        <MainSearch initText='Search a company or ticker' />
      </div>
    </div>
    );
};

export default Main;
