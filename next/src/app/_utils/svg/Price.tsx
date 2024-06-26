import { PriceDataPoint } from "../fetchData";
import {
    scaleBand,
    scaleLinear,
    axisBottom,
    axisLeft,
    utcMonday,
    utcMonth,
    utcFormat,
    format,
    create
} from "d3";
import { 
    margin,
    yBuffered,
    centTick,
    tensTick,
    fivesTick,
    onesTick,
    yearTick,
    threeMonthsTick,
    monthTick,
    weekStartTick,
    dayTick
} from "./Generate";



export const smPriceSvg = (data: PriceDataPoint[], height: number, width: number): string => {
    const candleWidth = width / (data.length * 1.75);
    const candleOffset = candleWidth / 2;
    const length = data.length;
    const ticker: string = data[0].ticker.toString();
    const stringList = data.map((d) => String(d.timestamp));
    const formatMonth = utcFormat("%b");
    const svg = create("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background", "transparent");
    const timeMin = Math.min(...data.map(d => +d.low_price));
    const timeMax = Math.max(...data.map(d => +d.high_price));
    const yDomain = yBuffered(timeMin, timeMax);
    const y = scaleLinear()
        .range([height - margin.top, 0 + margin.bottom])
        .domain(yDomain);
    const x = scaleBand()
        .domain(stringList)
        .range([margin.left, width - margin.right]);

    // if (length < 399) {
        // add tens ticks and labels
        const tens = tensTick(timeMin, timeMax);
        console.log(tens);
        const yTensAxis = svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(axisLeft(y)
                  .tickValues(tens)
                  .tickFormat(() => "")
                  .tickSize((-width) + (2 * margin.left)))
            .call(g => g.select(".domain").remove())
            .attr("opacity", 0.3)
            .selectAll(".tick line")
            .attr("stroke", "#FFE4D1");
        yTensAxis.selectAll('text').remove();
        tens.forEach(tick => {
            svg.append("text")
              .attr("x", margin.left + 6)
              .attr("y", y(tick))
              .attr("text-anchor", "left")
              .attr("fill", "#FFE4D1")
              .style("font-size", "12")
              .text(`${format(",")(tick)}`) // Formatting tick value
              .attr("opacity", 0.3);
        });

        // add month ticks and labels
        const months = monthTick(stringList);
        const monthLabels = months.slice(0, -1);
        const xMonthAxis = svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(axisBottom(x).tickValues(months).tickFormat(() => "").tickSize((-height) + (2 * margin.bottom)))
            .call(g => g.select(".domain").remove())
            .attr("opacity", 0.3)
            .selectAll(".tick line")
            .attr("stroke", "#FFE4D1");
        xMonthAxis.selectAll('text').remove();
        monthLabels.forEach(tick => {
            const tickDate = new Date(tick);
            const label = formatMonth(tickDate);
            svg.append("text")
              .attr("x", x(tick)! + 4)
              .attr("y", height - margin.bottom)
              .attr("text-anchor", "left")
              .attr("fill", "#FFE4D1") // can fill with hex #000000
              .style("font-size", `${(16 + Math.ceil(x.bandwidth() * 3))}px`)
              .text(label.toUpperCase())
              .attr("opacity", 0.6);
        });
    // }

    svg.append("text")
        .attr("x", margin.left)
        .attr("y", height - margin.bottom)
        .attr("text-anchor", "center")
        .attr("fill", "#877B74")
        .style("font-size", `${width / 3}px`)
        .text(ticker.toUpperCase())
        .attr("opacity", 0.2);

    // add candle and wick
    svg.selectAll(".candle")
        .data(data)
        .enter().append("rect")
        .attr("x", d => x(d.timestamp)! + x.bandwidth() / 2 - candleOffset)
        .attr("width", candleWidth)
        .attr("y", d => y(Math.max(+d.open_price, +d.close_price)))
        .attr("height", d => Math.abs(y(+d.open_price) - y(+d.close_price)))
        .attr("fill", d => d.open_price > d.close_price ? "red" : "green")
        .attr("rx", 2)
        .attr("ry", 2);
    svg.selectAll(".wick")
        .data(data)
        .enter().append("line")
        .attr("x1", d => x(d.timestamp)! + x.bandwidth() / 2)
        .attr("x2", d => x(d.timestamp)! + x.bandwidth() / 2)
        .attr("y1", d => y(+d.high_price))
        .attr("y2", d => y(+d.low_price))
        .attr("stroke", d => d.open_price > d.close_price ? "red" : "green");


    const svgNode = svg.node();
    if (svgNode === null) {
        console.error("Failed to create SVG node");
        return '';
    }
    return (svgNode.outerHTML);
};

export const priceSvg = (data: PriceDataPoint[], height: number, width: number): string => {
};

