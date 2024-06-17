"use client"
import React from 'react';
import MainSearch from '@/components/MainSearch';
import { fetchPriceData } from '@/_utils/fetchData';
import stockList from "@/stocks.json";

const Main = () => {
    return (
    <div className='justify-center'>
      <MainSearch initText='ticker or company' />
    </div>
    );
};

export default Main;
