"use client"
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function AreaGraph({ list }: { list: any }) {
  if (!list) {
    return <div>No data available</div>;
  }

  const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  const width = 160 - margin.left - margin.right;
  const height = 100 - margin.top - margin.bottom;

  const x = d3.scaleTime()
    .range([0, width]);
  const y = d3.scaleLinear()
    .range([height, 0]);
  
  const ref = useRef()

  useEffect(() => {
    const svgElement = d3.select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  }, [])

  d3.json("http://3.140.61.213/api/aapl/6m", function(data) {
    console.log(data);
  });

  return (
    <svg ref={ref}/>
  );
}
export default AreaGraph;
