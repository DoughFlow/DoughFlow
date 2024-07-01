import { volDataPoint } from "../fetchData";
import {
    scaleBand, scaleLinear, axisBottom, axisLeft, utcMonday, utcMonth,
    utcFormat, format, create
} from "d3";
import { 
    margin, yBuffered, centTick, tensTick, fivesTick, onesTick, yearTick,
    threeMonthsTick, monthTick, weekStartTick, dayTick, C
} from "./Generate";

export const volSvg = (data: volDataPoint[], height: number, width: number,
ticker: string, time: string): string => {
  /***
    const calculateOpacity = (yValue: number) => {
        const distanceFromBottom = height - margin.bottom - yValue;
        return Math.max(0.1, 1 - (distanceFromBottom / (height - margin.bottom)));
    };
  ***/
    const stringList = data.map((d) => String(d.timestamp));
    const formatMonth = utcFormat("%b");
    const formatDay = utcFormat("%m/%d");
    const timeMin = Math.min(...data.map(d => +d.vol));
    const timeMax = Math.max(...data.map(d => +d.vol));
    const yDomain = yBuffered(timeMin, timeMax);
    console.log(yDomain);
    const yRange = [height - margin.top, margin.bottom];
    const xRange = [margin.left, width - margin.right];
    const y = scaleLinear()
        .range(yRange)
        .domain(yDomain);
    const x = scaleBand()
        .domain(stringList)
        .range(xRange);

    const svg = create("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background", "transparent");

    // scale and append background ticker
    svg.append("text").backgroundTicker(width, height, ticker);
    
    // format and append axis
    svg.xAxisGenerator(width, height, stringList, xRange);
    svg.yAxisGenerator(width, yDomain, yRange);

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(String(d.timestamp))!)
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.vol))
        .attr("height", d => height - y(d.vol))
        .attr("fill", `${C.dfBrown}`)
        // removed while making axis
        // .attr("opacity", d => calculateOpacity(y(d.vol)));
        .attr("opacity", 0.7);
    const svgNode = svg.node();
    if (svgNode === null) {
        console.error("Failed to create SVG node");
        return '';
    }
    return (svgNode.outerHTML);
}
