import { smaDataPoint } from "../fetchData";
import {
    scaleBand, scaleLinear, axisBottom, axisLeft, utcMonday, utcMonth,
    utcFormat, format, create, line
} from "d3";
import { 
    margin, yBuffered, centTick, tensTick, fivesTick, onesTick, yearTick,
    threeMonthsTick, monthTick, weekStartTick, dayTick, C
} from "./Generate";


export const smaSvg = (data: smaDataPoint[], height: number, width: number,
ticker: string, time: string): string => {

    const stringList = data.map((d) => String(d.timestamp));
    const formatMonth = utcFormat("%b");
    const formatDay = utcFormat("%m/%d");
    const timeMin = Math.min(...data.map(d => +d.sma));
    const timeMax = Math.max(...data.map(d => +d.sma));
    const yDomain = yBuffered(timeMin, timeMax);
    const yRange = [height - margin.top, 0 + margin.bottom]
    const xRange = [margin.left, width - margin.right]

    const svg = create("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background", "transparent");

    var border = svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", height)
      .attr("width", width)
      .style("stroke", `${C.dfBlack}`)
      .style("fill", "none")
      .style("stroke-width", 1);

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


    const smaLine = line<smaDataPoint>()
        .x(d => x(String(d.timestamp))! + x.bandwidth() / 2)
        .y(d => y(+d.sma));
     svg.append("path")
        .datum(data)
        .attr("class", "line")
        .style("stroke", "#996F4F")
        .style("stroke-width", "3px")
        .style("fill", "none")
        .attr("d", smaLine);

    const svgNode = svg.node();
    if (svgNode === null) {
        console.error("Failed to create SVG node");
        return '';
    }
    return (svgNode.outerHTML);
};
