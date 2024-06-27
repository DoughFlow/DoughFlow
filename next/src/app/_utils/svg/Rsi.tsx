import { rsiDataPoint } from "../fetchData";
import {
    scaleBand, scaleLinear, axisBottom, axisLeft, utcMonday, utcMonth,
    utcFormat, format, create
} from "d3";
import { 
    margin, yBuffered, centTick, tensTick, fivesTick, onesTick, yearTick,
    threeMonthsTick, monthTick, weekStartTick, dayTick
} from "./Generate";


export const smRsiSvg = (data: rsiDataPoint[], height: number, width: number, ticker: string, time: string): string => {
    const candleWidth = width / (data.length * 1.75);
    const candleOffset = candleWidth / 2;
    const stringList = data.map((d) => String(d.timestamp));
    const formatMonth = utcFormat("%b");
    const svg = create("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background", "transparent");
    const timeMin = Math.min(...data.map(d => +d.rsi));
    const timeMax = Math.max(...data.map(d => +d.rsi));
    const yDomain = yBuffered(timeMin, timeMax);
    const y = scaleLinear()
        .range([height - margin.top, 0 + margin.bottom])
        .domain(yDomain);
    const x = scaleBand()
        .domain(stringList)
        .range([margin.left, width - margin.right]);

    if (time === "1m") {

    } else if (time === "3m") {

    } else if (time === "6m") {

    } else if (time === "1y") {

    } else if (time === "2y") {

    } else {

    }
    const svgNode = svg.node();
    if (svgNode === null) {
        console.error("Failed to create SVG node");
        return '';
    }
    return (svgNode.outerHTML);
};

export const rsiSvg = (data: rsiDataPoint[], height: number, width: number, ticker: string, time: string): string => {
    const candleWidth = width / (data.length * 1.75);
    const candleOffset = candleWidth / 2;
    const stringList = data.map((d) => String(d.timestamp));
    const formatMonth = utcFormat("%b");
    const svg = create("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background", "transparent");
    const timeMin = Math.min(...data.map(d => +d.rsi));
    const timeMax = Math.max(...data.map(d => +d.rsi));
    const yDomain = yBuffered(timeMin, timeMax);
    const y = scaleLinear()
        .range([height - margin.top, 0 + margin.bottom])
        .domain(yDomain);
    const x = scaleBand()
        .domain(stringList)
        .range([margin.left, width - margin.right]);

    if (time === "1m") {

    } else if (time === "3m") {

    } else if (time === "6m") {

    } else if (time === "1y") {

    } else if (time === "2y") {

    } else {

    }
    const svgNode = svg.node();
    if (svgNode === null) {
        console.error("Failed to create SVG node");
        return '';
    }
    return (svgNode.outerHTML);
};

