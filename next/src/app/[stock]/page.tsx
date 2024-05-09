'use client'
import { useEffect, useRef } from 'react';
import { useGlobal, StockData } from '@/components/GlobalContext';

function StockPage({ params }: { params: { stock: string } }) {
    // Add context and Ref for useEffect
    const { stocks, addStock, clearStock } = useGlobal();
    const hasRun = useRef(false);
    
    if (!hasRun.current) {
      hasRun.current = true;
        const newStock = {
          ticker: params.stock,
          indicator: 'vol',
          position: 'left'}
        addStock(newStock);
    }

    return (
        <div>
            {stocks.map((stock, index) => (
                <p key={index}>{stock.ticker} - {stock.indicator} - {stock.position}</p>
            ))}
        </div>
    );
};
export default StockPage;

