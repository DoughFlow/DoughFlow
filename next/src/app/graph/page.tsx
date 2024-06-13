"use client"
import React, { useEffect, useState } from 'react';
import { fetchIndicatorData, IndicatorDataPoint } from '@/_utils/fetchData';
import { candlestickSVG, lineSVG, barSVG } from '@/_utils/generateSVG';
import { Stock } from '@/components/StockContext';

const Graph = () => {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    const fetchAndRenderGraph = async () => {
      const newStock: Stock = {ticker: "aapl", value: "vol", time: "6m"};
      const data = await fetchIndicatorData(newStock.ticker, newStock.time, newStock.value);
      const svg = lineSVG(data, 1000, 1600);
      setSvgContent(svg);
    };

    fetchAndRenderGraph();
  }, []);

  return (
    <div className='graph-container'>
      Graph
      {/* Safely inject SVG content */}
      <div dangerouslySetInnerHTML={{ __html: svgContent }} />
    </div>
  );
};

export default Graph;
