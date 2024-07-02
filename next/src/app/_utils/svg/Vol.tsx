import { volDataPoint } from "../fetchData";
import { scaleBand, scaleLinear, create } from "d3";
import { margin, yBuffered, C, mobile_margin } from "./Generate";

export const volSvg = (data: volDataPoint[], height: number, width: number,
ticker: string, time: string): string => {
  /***
    const calculateOpacity = (yValue: number) => {
        const distanceFromBottom = height - margin.bottom - yValue;
        return Math.max(0.1, 1 - (distanceFromBottom / (height - margin.bottom)));
    };
  ***/
    const barWidth = width / (data.length * 1.75); // Same as candleWidth
    const barOffset = barWidth / 2;
    const stringList = data.map((d) => String(d.timestamp));
    const timeMin = Math.min(...data.map(d => +d.vol));
    const timeMax = Math.max(...data.map(d => +d.vol));
    const yDomain = yBuffered(timeMin, timeMax);
    const yRange = [height - margin.top, margin.bottom];
    const xRange = [mobile_margin.left, width - mobile_margin.right];
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

    // Define the gradients dynamically
    data.forEach((d, i) => {
        const barHeight = height - mobile_margin.bottom - y(d.vol);
        const grad = svg.append("defs")
            .append("linearGradient")
            .attr("id", `grad${i}`)
            .attr("x1", "0%")
            .attr("x2", "0%")
            .attr("y1", "0%")
            .attr("y2", "100%");

        grad.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", `${C.dfYellow}`)
            .attr("stop-opacity", 0.6);

        grad.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", `${C.dfYellow}`)
            .attr("stop-opacity", 0.01);
    });

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.timestamp)! + x.bandwidth() / 2 - barOffset)
        .attr("width", barWidth)
        .attr("y", d => y(d.vol))
        .attr("height", d => height - margin.bottom - y(d.vol))
        .style("fill", (d, i) => `url(#grad${i})`);

    const svgNode = svg.node();
    if (svgNode === null) {
        console.error("Failed to create SVG node");
        return '';
    }
    return (svgNode.outerHTML);
}
