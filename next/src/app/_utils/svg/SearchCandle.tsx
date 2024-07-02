import { PriceDataPoint } from "../fetchData";
import { scaleBand, scaleLinear, create } from "d3";
import { yBuffered,  mobile_margin, C } from "./Generate";


export const searchPriceSvg = (data: PriceDataPoint[], height: number, width: number): string => {
    const candleWidth = width / (data.length * 1.75);
    const candleOffset = candleWidth / 2;
    const ticker: string = data[0].ticker.toString();
    const timeMin = Math.min(...data.map(d => +d.low_price));
    const timeMax = Math.max(...data.map(d => +d.high_price));
    const yDomain = yBuffered(timeMin, timeMax);
    const yRange = [height - (mobile_margin.top + 20), 15 + mobile_margin.bottom];
    const xDomain = data.map((d) => String(d.timestamp));
    const xRange = [mobile_margin.left, width - mobile_margin.right];

    const svg = create("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background", `${C.dfBlack}`);

    const y = scaleLinear()
        .range(yRange)
        .domain(yDomain);
    const x = scaleBand()
        .domain(xDomain)
        .range(xRange);

    // scale ticker text and put behind graph
    svg.append("text").backgroundTicker(width, height, ticker);

    // add candle and wick
    svg.selectAll(".candle")
        .data(data)
        .enter().append("rect")
        .attr("x", d => x(d.timestamp)! + x.bandwidth() / 2 - candleOffset)
        .attr("width", candleWidth)
        .attr("y", d => y(Math.max(+d.open_price, +d.close_price)))
        .attr("height", d => Math.abs(y(+d.open_price) - y(+d.close_price)))
        .attr("fill", d => d.open_price > d.close_price ? "red" : `${C.dfGreen}`)
        .attr("rx", 2)
        .attr("ry", 2);

    svg.selectAll(".wick")
        .data(data)
        .enter().append("line")
        .attr("x1", d => x(d.timestamp)! + x.bandwidth() / 2)
        .attr("x2", d => x(d.timestamp)! + x.bandwidth() / 2)
        .attr("y1", d => y(+d.high_price))
        .attr("y2", d => y(+d.low_price))
        .attr("stroke", d => d.open_price > d.close_price ? "red" : `${C.dfGreen}`);

    // Add green horizontal line at timeMax
    svg.append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", y(timeMax))
        .attr("y2", y(timeMax))
        .attr("opacity", "0.3")
        .attr("stroke", `${C.dfGreen}`)
        .attr("stroke-width", 2);

    // Add text on the left of the green line
    svg.append("text")
        .attr("x", mobile_margin.left + 10)
        .attr("y", y(timeMax) - 5)
        .attr("text-anchor", "start")
        .attr("fill", `${C.dfGreen}`)
        .style("font-size", "12px")
        .text(`$${timeMax}`);

    // Add red horizontal line at timeMin
    svg.append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", y(timeMin))
        .attr("y2", y(timeMin))
        .attr("opacity", "0.3")
        .attr("stroke", "red")
        .attr("stroke-width", 2);

    // Add text on the left of the red line
    svg.append("text")
        .attr("x", mobile_margin.left + 10)
        .attr("y", y(timeMin) + 15)
        .attr("text-anchor", "start")
        .attr("fill", "red")
        .style("font-size", "12px")
        .text(`$${timeMin}`);

    const svgNode = svg.node();
    if (svgNode === null) {
        console.error("Failed to create SVG node");
        return '';
    }
    return (svgNode.outerHTML);
};
