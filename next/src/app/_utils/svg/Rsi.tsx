import { rsiDataPoint } from "../fetchData";
import { scaleBand, scaleLinear, utcFormat, create, line } from "d3";
import { margin, yBuffered, mobile_margin } from "./Generate";

export const rsiSvg = (data: rsiDataPoint[], height: number, width: number, 
ticker: string): string => {

    const stringList = data.map((d) => String(d.timestamp));
    const timeMin = Math.min(...data.map(d => +d.rsi));
    const timeMax = Math.max(...data.map(d => +d.rsi));
    const yDomain = yBuffered(timeMin, timeMax);
    const yRange = [height - margin.top, 0 + margin.bottom]
    const xRange = [mobile_margin.right*2, width - margin.right]

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

    const rsiLine = line<rsiDataPoint>()
        .x(d => x(String(d.timestamp))! + x.bandwidth() / 2)
        .y(d => y(+d.rsi));
     svg.append("path")
        .datum(data)
        .attr("class", "line")
        .style("stroke", "#996F4F")
        .style("stroke-width", "3px")
        .style("fill", "none")
        .attr("d", rsiLine);

    const svgNode = svg.node();
    if (svgNode === null) {
        console.error("Failed to create SVG node");
        return '';
    }
    return (svgNode.outerHTML);
};
