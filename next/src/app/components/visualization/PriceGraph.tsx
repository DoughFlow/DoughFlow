import React, { useEffect, useRef, useState } from 'react';
import PriceData from '@components/visualization/PriceData';
import * as d3 from 'd3';
/**
interface PriceGraphData {
  timestamp: string;
  open_price: number;
  high_price: number;
  low_price: number;
  close_price: number;
  volume: number;
}

interface PriceGraphProps {
  data: PriceGraphData[];
}
**/
interface DataPoint {
    timestamp: string;
    ticker: string;
    open_price: number;
    high_price: number;
    low_price: number;
    close_price: number;
    volume: number;
    candle_time: string;
}

const PriceGraph = ({ticker}:{ticker:string}) => {
  const ref = useRef<SVGSVGElement>(null);

  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    PriceData(ticker).then((result) => {
      setData(result);
      });
  }, [ticker, data]);

  useEffect(() => {
    if (data.length === 0) return;

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 700 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    d3.select(ref.current).selectAll("*").remove();

    const svg = d3.select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.3);

    const y = d3.scaleLinear()
      .range([height, 0]);

    const ymin = Math.min(...data.map(d => d.low_price));
    const ymax = Math.max(...data.map(d => d.high_price));
    y.domain([ymin, ymax]);

    x.domain(data.map(d => d.timestamp));

    svg.selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("x", d => x(d.timestamp)!)
      .attr("y", d => y(Math.max(d.open_price, d.close_price)))
      .attr("height", d => Math.abs(y(d.open_price) - y(d.close_price)))
      .attr("width", x.bandwidth())
      .attr("fill", d => d.open_price > d.close_price ? "red" : "green");

    svg.selectAll("line.stem")
      .data(data)
      .enter().append("line")
      .attr("class", "stem")
      .attr("x1", d => x(d.timestamp)! + x.bandwidth() / 2)
      .attr("x2", d => x(d.timestamp)! + x.bandwidth() / 2)
      .attr("y1", d => y(d.high_price))
      .attr("y2", d => y(d.low_price))
      .attr("stroke", d => d.open_price > d.close_price ? "red" : "green");

    svg.append("g")
       .attr("class", "x axis")
       .attr("transform", `translate(0,${height})`)
       .call(d3.axisBottom(x).tickFormat(d => formatDate(d)));

    svg.append("g")
       .attr("class", "y axis")
       .call(d3.axisLeft(y));

  }, [data]);

  // Helper function to format date for ticks
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  return (
  <svg ref={ref}></svg>
  );
};

export default PriceGraph;
