import { PriceDataPoint, volDataPoint, smaDataPoint, rsiDataPoint } from "@/_utils/fetchData";
import * as d3 from "d3";

export const candlestickSVG = (data: PriceDataPoint[], height: number, width:number) => {
  const { max } = d3;
  const candleWidth = width / (data.length * 1.75);
  const candleOffset = candleWidth / 2;
  const yDomain = [
    Math.min(...data.map(d => +d.low_price)),
    Math.max(...data.map(d => +d.high_price))
  ];
 const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "transparent")
    .style("border", "1px solid white")
  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain(yDomain);
  const xScale = d3.scalePoint<Date>()
    .range([0, width])
    .domain(data.map(d => new Date(d.timestamp)))
    .padding(0.5);
  svg.selectAll(".candle")
    .data(data)
    .enter().append("rect")
    .attr("x", d => xScale(new Date(d.timestamp))! + xScale.bandwidth() / 2 - candleOffset)
    .attr("width", candleWidth)
    .attr("y", d => yScale(Math.max(+d.open_price, +d.close_price)))
    .attr("height", d => Math.abs(yScale(+d.open_price) - yScale(+d.close_price)))
    .attr("fill", d => d.open_price > d.close_price ? "red" : "green");
  svg.selectAll(".wick")
    .data(data)
    .enter().append("line")
    .attr("x1", d => xScale(new Date(d.timestamp))! + xScale.bandwidth() / 2)
    .attr("x2", d => xScale(new Date(d.timestamp))! + xScale.bandwidth() / 2)
    .attr("y1", d => yScale(+d.high_price))
    .attr("y2", d => yScale(+d.low_price))
    .attr("stroke", d => d.open_price > d.close_price ? "red" : "green");
  const svgNode = svg.node();
  if (svgNode === null) {
    console.error("Failed to create SVG node");
    return '';
  }
  return (svgNode.outerHTML);
}

export const volSVG = (data: volDataPoint[], height: number, width: number) => {
  const barWidth = width / (data.length * 1.75);
  const yDomain = [
    0,
    Math.max(...data.map(d => +d.vol))
  ];
  const xScale = d3.scalePoint<Date>()
    .range([0, width])
    .domain(data.map(d => new Date(d.timestamp)))
    .padding(0.2);
  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain(yDomain);
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "transparent")
    .style("border", "1px solid white")
  svg.selectAll("rect.bar")
    .data(data)
    .enter().append("rect")
    .classed("bar", true)
    .attr("x", d => xScale(new Date(d.timestamp)) ?? 0)
    .attr("y", d => yScale(+d.vol))
    .attr("width", barWidth)
    .attr("height", d => height - yScale(+d.vol))
    .attr("fill", "white");
  const svgNode = svg.node();
  if (svgNode === null) {
    console.error("Failed to create SVG node");
    return '';
  }
  return (svgNode.outerHTML);
};

export const smaSVG = (data: smaDataPoint[], height: number, width: number) => {
  const yDomain = [
    Math.min(...data.map(d => +d.sma)),
    Math.max(...data.map(d => +d.sma))
  ];
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "transparent")
    .style("border", "1px solid white")
  const xScale = d3.scalePoint<Date>()
    .range([0, width])
    .domain(data.map(d => new Date(d.timestamp)))
    .padding(0.5);
  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain(yDomain);
  const line = d3.line<smaDataPoint>()
    .x(d => xScale(new Date(d.timestamp)) ?? 0)
    .y(d => yScale(+d.sma) ?? 0);
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("d", line);
  const svgNode = svg.node();
  if (svgNode === null) {
    console.error("Failed to create SVG node");
    return '';
  }
  return (svgNode.outerHTML);
};

export const rsiSVG = (data: rsiDataPoint[], height: number, width: number) => {
  const yDomain = [
    Math.min(...data.map(d => +d.rsi)),
    Math.max(...data.map(d => +d.rsi))
  ];
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "transparent")
    .style("border", "1px solid white")
  const xScale = d3.scalePoint<Date>()
    .range([0, width])
    .domain(data.map(d => new Date(d.timestamp)))
    .padding(0.5);
  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain(yDomain);
  const line = d3.line<rsiDataPoint>()
    .x(d => xScale(new Date(d.timestamp)) ?? 0)
    .y(d => yScale(+d.rsi) ?? 0);
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("d", line);
  const svgNode = svg.node();
  if (svgNode === null) {
    console.error("Failed to create SVG node");
    return '';
  }
  return (svgNode.outerHTML);
};

