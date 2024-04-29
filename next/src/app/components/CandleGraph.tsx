// CandleGraph.tsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  timestamp: string;  // Assuming ISO format
  open_price: number;
  high_price: number;
  low_price: number;
  close_price: number;
  volume: number;
}

interface CandleGraphProps {
  data: DataPoint[];
}

const CandleGraph = ({ data }: CandleGraphProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data.length) return;

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 1000 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Clear the SVG on each render
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Scaling
    const xScale = d3.scaleBand()
      .range([0, width])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .range([height, 0]);
    // Domains
      xScale.domain(data.map(d => d.timestamp))
      yScale.domain([Math.min(...data.map(d => d.low_price)), Math.max(...data.map(d => d.high_price))])
    // Draw candles
    svg.selectAll(".candle")
      .data(data)
      .enter()
      .append("rect")
      .attr('x', d => xScale(d.timestamp) + xScale.bandwidth() / 4)
      .attr('y', d => yScale(Math.max(d.open_price, d.close_price)))
      .attr('width', xScale.bandwidth() / 2)
      .attr('height', d => Math.abs(yScale(d.open_price) - yScale(d.close_price)))
      .attr('fill', d => d.open_price > d.close_price ? 'red' : 'green');

    // Draw wicks
    svg.selectAll(".wick")
      .data(data)
      .enter()
      .append("line")
      .attr('x1', d => xScale(d.timestamp) + xScale.bandwidth() / 2)
      .attr('x2', d => xScale(d.timestamp) + xScale.bandwidth() / 2)
      .attr('y1', d => yScale(d.high_price))
      .attr('y2', d => yScale(d.low_price))
      .attr('stroke', d => d.open_price > d.close_price ? 'red' : 'green');

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y-%m-%d")));
    
    svg.append('g')
      .call(d3.axisLeft(yScale));

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default CandleGraph;

