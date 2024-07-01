import { PriceDataPoint } from "../fetchData";
import { scaleBand, scaleLinear, axisBottom, axisLeft, utcMonday, utcMonth,
         utcFormat, format, create } from "d3";
import { margin, yBuffered, centsTick, tensTick, fivesTick, onesTick, yearTick,
         threeMonthTick, monthTick, weekStartTick, dayTick, mobile_margin, C,
         formatMonth, formatDay } from "./Generate";


export const priceSvg = (data: PriceDataPoint[], height: number, width: number,
time: string): string => {

    const candleWidth = width / (data.length * 1.75);
    const candleOffset = candleWidth / 2;
    const ticker: string = data[0].ticker.toString();
    const timeMin = Math.min(...data.map(d => +d.low_price));
    const timeMax = Math.max(...data.map(d => +d.high_price));
    const yDomain = yBuffered(timeMin, timeMax);
    const yRange = [height - mobile_margin.top, 0 + mobile_margin.bottom];
    const xDomain = data.map((d) => String(d.timestamp));
    const xRange = [mobile_margin.left, width - mobile_margin.right];

    const svg = create("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background", `${C.dfBrown}`)

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
        .domain(xDomain)
        .range(xRange);

    // scale ticker text and put behind graph
    svg.append("text").backgroundTicker(width, height, ticker);

    // calculate axis tick marks, draw & label them
    svg.yAxisGenerator(width, yDomain, yRange);
    svg.xAxisGenerator(width, height, xDomain, xRange);

    // add candle and wick
    svg.selectAll(".candle")
        .data(data)
        .enter().append("rect")
        .attr("x", d => x(d.timestamp)! + x.bandwidth() / 2 - candleOffset)
        .attr("width", candleWidth)
        .attr("y", d => y(Math.max(+d.open_price, +d.close_price)))
        .attr("height", d => Math.abs(y(+d.open_price) - y(+d.close_price)))
        .attr("fill", d => d.open_price > d.close_price ? `${C.dfRed}` : `${C.dfGreen}`)
        .attr("rx", 2)
        .attr("ry", 2);
    svg.selectAll(".wick")
        .data(data)
        .enter().append("line")
        .attr("x1", d => x(d.timestamp)! + x.bandwidth() / 2)
        .attr("x2", d => x(d.timestamp)! + x.bandwidth() / 2)
        .attr("y1", d => y(+d.high_price))
        .attr("y2", d => y(+d.low_price))
        .attr("stroke", d => d.open_price > d.close_price ? `${C.dfRed}` : `${C.dfGreen}`);
    const svgNode = svg.node();
    if (svgNode === null) {
        console.error("Failed to create SVG node");
        return '';
    }
    return (svgNode.outerHTML);
};
