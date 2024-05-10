import React, { useEffect, useRef, useState } from "react";
import PriceData from "@components/visualization/PriceData";
import { useGlobal } from "@components/GlobalContext";
import * as d3 from "d3";

/**
 * Candlestick Graph component for visualizing stock price data.
 *
 * @param ticker - Ticker symbol for the stock data.
 * @returns Candlestick Graph component.
 */
const PriceGraph = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const {stocks} = useGlobal();
  const ticker = stocks.ticker1;
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
    const total_width = data.length * 12;
    const component_width = 700;
    //const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    // Helper function for tooltip position
    const tooltipHelper = (x: number, y: number): [number, number] => {
      // Adjust tooltip position if it exceeds screen boundaries
      let adjustedX = x + 10;
      let adjustedY = y + 10;

      if (adjustedY + 150 > height) {
        adjustedY = height - 150;
      }
      switch (true) {
        case adjustedX + 300 > window.innerWidth:
          adjustedX = window.innerWidth - 300;
          break;
        case adjustedX + 250 > total_width:
          adjustedX = total_width - 250;
          break;
      }
      return [adjustedX, adjustedY];
    };

    // Begin defining plot stuff
    const parent = d3
      .select(svgRef.current)
      .attr("width", component_width)
      .attr("height", height + margin.top + margin.bottom);

    // holds y axis
    const y_axis_svg = parent
      .append("svg")
      .attr("height", height + margin.top + margin.bottom)
      //.attr('width','')
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("z-index", 1);

    // body holds the plot with x axis
    const body = parent.append("div").style("overflow-x", "auto");

    // svg is the x axis and plot
    const svg = body
      .append("svg")
      .attr("width", total_width)
      .attr("height", height + margin.top + margin.bottom);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    //const x = d3.scaleBand().range([0, total_width])
    //.domain(data.map((d) => d.timestamp));

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

    // Vertical bars spanning entire graph for tooltip
    g.selectAll(".xGroup")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "xBar")
      .attr("x", (d) => xScale(d.timestamp)!)
      .attr("y", 0)
      .attr("width", "12px")
      .attr("height", height)
      .attr("fill", "dfgrey")
      .on("mouseover", (evt, d) => {
        const [mx, my] = d3.pointer(evt);
        let tooltipText = `Date: ${d.timestamp}
Open: ${d.open_price}
Close: ${d.close_price} 
Low: ${d.low_price}
High: ${d.high_price}`;

        if (d.volume !== undefined) {
          tooltipText += `\nVolume: ${d.volume}`;
        }

        const tooltipPosition = tooltipHelper(mx, my);

        tooltip
          .attr(
            "transform",
            `translate(${tooltipPosition[0]}, ${tooltipPosition[1]})`,
          )
          .selectAll("tspan")
          .data(tooltipText.split("\n"))
          .join("tspan")
          .attr("dy", "1.5em") // spacing between the lines
          .attr("x", "20px") // Space to the right of the cursor
          .text((text) => text);
      })
      .on("mouseout", () => tooltip.selectAll("tspan").remove());

    g.selectAll(".candle")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "candle")
      .attr("x", (d) => xScale(d.timestamp)!)
      .attr("y", (d) => yScale(Math.max(d.open_price, d.close_price)))
      .attr("width", "12px")
      .attr("height", (d) =>
        Math.abs(yScale(d.open_price) - yScale(d.close_price)),
      )
      .attr("fill", (d) => (d.close_price >= d.open_price ? "green" : "red"))
      .on("mouseover", (evt, d) => {
        const [mx, my] = d3.pointer(evt);
        let tooltipText = `Date: ${d.timestamp}
Open: ${d.open_price}
Close: ${d.close_price} 
Low: ${d.low_price}
High: ${d.high_price}`;

        if (d.volume !== undefined) {
          tooltipText += `\nVolume: ${d.volume}`;
        }

        const tooltipPosition = tooltipHelper(mx, my);

        tooltip
          .attr(
            "transform",
            `translate(${tooltipPosition[0]}, ${tooltipPosition[1]})`,
          )
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
      .attr("x", (d) => xScale(d.timestamp)! + 6)
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
      .attr("overflow", "scroll");

    y_axis_svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`) // Translate the y-axis group to adjust for margins;
      .call(yAxis)
      .attr("text-anchor", "end");

    g.selectAll("xGrid")
      .data(data.filter((d, i) => isMonday(d) && i % 4 === 0))
      .enter()
      .append("line")
      .attr("class", "vertical-line")
      .attr("x1", (d) => xScale(d.timestamp)!) // Center of the bar
      .attr("y1", height)
      .attr("x2", (d) => xScale(d.timestamp)!) // Center of the bar
      .attr("y2", 0)
      //.attr("stroke", "white")
      .classed("stroke-dfbrown", true)
      .attr("stroke-width", 1);

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
  }, [data]);

  // Helper function for mondayFilter and for x-axis bars
  const isMonday = (d: DataPoint): boolean => {
    const date = new Date(d.timestamp);
    if (date.getDay() === 1) {
      return true;
    } else {
      return false;
    }
  };
  // Helper function to get every other monday for x axis
  const mondayFilter = (data: DataPoint[]): string[] => {
    const mondays: string[] = [];
    const everyOtherMonday: string[] = [];

    data.forEach((obj) => {
      if (isMonday(obj)) {
        mondays.push(obj.timestamp);
      }
    });

    for (let i = 0; i < mondays.length; i += 2) {
      everyOtherMonday.push(mondays[i]);
    }

    return everyOtherMonday;
  };

  return <div ref={svgRef}></div>;
};

export default PriceGraph;
