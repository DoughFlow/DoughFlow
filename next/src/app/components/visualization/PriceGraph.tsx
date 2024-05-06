import React, { useEffect, useRef, useState } from "react";
import PriceData from "@components/visualization/PriceData";
import * as d3 from "d3";

interface StockData {
  timestamp: string;
  open_price: number;
  high_price: number;
  low_price: number;
  close_price: number;
  volume?: number;
  candle_time: string;
}

/**
 * Candlestick Graph component for visualizing stock price data.
 * 
 * @param ticker - Ticker symbol for the stock data.
 * @returns Candlestick Graph component.
 */
const PriceGraph = ({ ticker }: { ticker: string }) => {
  const [data, setData] = useState<StockData[]>([]);
  const svgRef = useRef(null);

  useEffect(() => {
    PriceData(ticker).then((result) => {
      setData(result);
    });
  }, [ticker]);

  useEffect(() => {
    console.log("begining main plot");
    console.log(data.slice(0, 2));

    if (data.length === 0) return;

    d3.select(svgRef.current).selectAll("svg").remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const total_width = data.length * 16;
    const component_width = 700;
    //const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    // parent is parent
    const parent = d3
      .select(svgRef.current)
      .attr("width", component_width)
      .attr("height", height + margin.top + margin.bottom)
      .attr("overflow-x", "hidden");

    // holds y axis
    const y_axis_svg = parent
      .append("svg")
      .attr("height", height + margin.top + margin.bottom)
      //.attr('width','')
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("z-index", 1);

    // body holds the plot with x axis
    const body = parent.append("div").style("overflow-x", "scroll");

    // svg is the x axis and plot
    const svg = body
      .append("svg")
      .attr("width", total_width)
      .attr("height", height + margin.top + margin.bottom);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime().range([0, total_width]);

    const y = d3.scaleLinear().range([height, 0]);

    // xScale
    const xScale = d3
      .scaleBand()
      .range([0, total_width])
      .domain(data.map((d) => d.timestamp));

    // yScale
    const ymin = Math.min(...data.map((d) => d.low_price));
    const ymax = Math.max(...data.map((d) => d.high_price));

    const yScale = d3.scaleLinear().range([height, 0]).domain([ymin, ymax]);

    const tooltip = g
      .append("text")
      .attr("class", "tooltip")
      .attr("fill", "white")
      .style("pointer-events", "none");

    g.selectAll(".candle")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "candle")
      .attr("x", (d) => xScale(d.timestamp)!)
      .attr("y", (d) => yScale(Math.max(d.open_price, d.close_price)))
      .attr("width", "16px")
      .attr("height", (d) =>
        Math.abs(yScale(d.open_price) - yScale(d.close_price)),
      )
      .attr("fill", (d) => (d.close_price >= d.open_price ? "green" : "red"))
      .on("mouseenter", (evt, d) => {
        const [mx, my] = d3.pointer(evt);
        let tooltipText = `Date: ${d.timestamp}
Open: ${d.open_price}
Close: ${d.close_price} 
Low: ${d.low_price}
High: ${d.high_price}`;

        if (d.volume !== undefined) {
          tooltipText += `\nVolume: ${d.volume}`;
        }
        tooltip
          .attr("transform", `translate(${mx}, ${my})`)
          .selectAll("tspan")
          .data(tooltipText.split("\n"))
          .join("tspan")
          .attr("dy", "1.5em") // spacing between the lines
          .attr("x", "20px") // Space to the right of the cursor
          .text((text) => text);
      })
      .on("mouseout", () => tooltip.selectAll("tspan").remove());

    g.selectAll(".wick")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "wick")
      .attr("x", (d) => xScale(d.timestamp)! + 8)
      .attr("y", (d) => yScale(d.high_price))
      .attr("width", "1px")
      .attr("height", (d) => yScale(d.low_price) - yScale(d.high_price))
      .attr("fill", (d) => (d.close_price >= d.open_price ? "green" : "red"));

    const xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(10);
    const yAxis = d3.axisLeft(yScale).tickSize(0).tickPadding(10);

    let xTickValues = mondayFilter(data);

    xAxis.tickValues(xTickValues);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .call((g) => g.select(".domain").remove())
      .attr("dx", "10em")
      .style("display", "flex")
      .style("text-anchor", "center")
      .style("font-size", "12px")
      .style("margin", "20px")
      .attr("overflow", "scroll")
      .style("color", "white");

    y_axis_svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`) // Translate the y-axis group to adjust for margins;
      .call(yAxis)
      .style("color", "white")
      .attr("text-anchor", "end");

    g.selectAll("xGrid")
      .data(x.ticks().slice(1))
      .join("line")
      .attr("x1", (d) => x(d))
      .attr("x2", (d) => x(d))
      .attr("y1", 0)
      .attr("y2", height)
      .attr("stroke", "red")
      .attr("stroke-width", 0.5);
    g.selectAll("yGrid")
      .data(y.ticks().slice(1))
      .join("line")
      .attr("x1", 0)
      .attr("x2", total_width)
      .attr("y1", (d) => y(d))
      .attr("y2", (d) => y(d))
      .attr("stroke", "green")
      .attr("stroke-width", 0.5);

    // tooltip needs to be on top of the other graph elements
    tooltip.raise();

    // Delete the extra useless scrollbar we get for some reason
    parent.selectAll<HTMLDivElement, unknown>("div").each(function () {
      if (this.childNodes.length === 0 || !this.textContent?.trim()) {
        d3.select(this).remove();
      }
    });
  }, [data]);

  // Helper function to check date for x axis
  const mondayFilter = (data: StockData[]): string[] => {
    const mondays: string[] = [];

    data.forEach((obj) => {
      const date = new Date(obj.timestamp);
      if (date.getDay() === 1) {
        mondays.push(obj.timestamp);
      }
    });

    return mondays;
  };

  return <div ref={svgRef}></div>;
};

export default PriceGraph;
