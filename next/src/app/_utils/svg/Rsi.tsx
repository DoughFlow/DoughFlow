import { rsiDataPoint } from "../fetchData";
import {
    scaleBand, scaleLinear, axisBottom, axisLeft, utcMonday, utcMonth,
    utcFormat, format, create, line
} from "d3";
import { 
    margin, yBuffered, centsTick, tensTick, fivesTick, onesTick, yearTick,
    threeMonthTick, monthTick, weekStartTick, dayTick
} from "./Generate";


export const rsiSvg = (data: rsiDataPoint[], height: number, width: number,
ticker: string, time: string): string => {
    const calculateOpacity = (yValue: number) => {
        const distanceFromBottom = height - margin.bottom - yValue;
        return Math.max(0.1, 1 - (distanceFromBottom / (height - margin.bottom)));
    };
    const stringList = data.map((d) => String(d.timestamp));
    const formatMonth = utcFormat("%b");
    const formatDay = utcFormat("%m/%d");
    const timeMin = Math.min(...data.map(d => +d.rsi));
    const timeMax = Math.max(...data.map(d => +d.rsi));
    const yDomain = yBuffered(timeMin, timeMax);
    const yRange = [height - margin.top, 0 + margin.bottom]
    const xRange = [margin.left, width - margin.right]

    const svg = create("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background", "transparent");

    const y = scaleLinear()
        .range(yRange)
        .domain(yDomain);
    const x = scaleBand()
        .domain(stringList)
        .range(xRange);

    // scale ticker text and put behind graph
    svg.append("text").backgroundTicker(width, height, ticker);

    // add axis
    svg.xAxisGenerator(width, height, stringList, xRange);
    svg.yAxisGenerator(width, yDomain, yRange);

          svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", line()
            .x(d => d.timestamp)
            .y(d => d.sma));
    const svgNode = svg.node();
    if (svgNode === null) {
        console.error("Failed to create SVG node");
        return '';
    }
    return (svgNode.outerHTML);
};
