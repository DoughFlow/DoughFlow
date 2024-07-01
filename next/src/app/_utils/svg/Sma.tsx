import { smaDataPoint } from "../fetchData";
import {
    scaleBand, scaleLinear, axisBottom, axisLeft, utcMonday, utcMonth,
    utcFormat, format, create, line
} from "d3";
import { 
    margin, yBuffered, centTick, tensTick, fivesTick, onesTick, yearTick,
    threeMonthsTick, monthTick, weekStartTick, dayTick
} from "./Generate";


export const smaSvg = (data: smaDataPoint[], height: number, width: number,
ticker: string, time: string, scalar: number): string => {

    const stringList = data.map((d) => String(d.timestamp));
    const formatMonth = utcFormat("%b");
    const formatDay = utcFormat("%m/%d");
    const timeMin = Math.min(...data.map(d => +d.sma));
    const timeMax = Math.max(...data.map(d => +d.sma));
    const yDomain = yBuffered(timeMin, timeMax);
    const yRange = [height - margin.top, 0 + margin.bottom]

    const svg = create("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background", "transparent");

    // scale ticker text and put behind graph
    svg.append("text").backgroundTicker(width, height, ticker);
      
    // calculate tick marks, draw & label them
    svg.yAxisGenerator(yDomain[0], yDomain[1]);

    const y = scaleLinear()
        .range(yRange)
        .domain(yDomain);
    const x = scaleBand()
        .domain(stringList)
        .range([margin.left, width - margin.right]);

    if (time === "1m") {
        // x axis
        const yearTicks = yearTick(stringList);
        const yearAxis = svg.append("g")
           .attr("transform", `translate(0,${height - margin.bottom})`)
           .call(axisBottom(x).tickValues(yearTicks).tickFormat(() => "").tickSize((-height) + (2 * margin.bottom)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        yearAxis.selectAll('text').remove();
        const monthTicks = monthTick(stringList);
        const monthAxis = svg.append("g")
           .attr("transform", `translate(0,${height - margin.bottom})`)
           .call(axisBottom(x).tickValues(monthTicks).tickFormat(() => "").tickSize((-height) + (2 * margin.bottom)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        monthAxis.selectAll('text').remove();
        const weekStart = weekStartTick(stringList);
        const weekAxis = svg.append("g")
           .attr("transform", `translate(0,${height - margin.bottom})`)
           .call(axisBottom(x).tickValues(weekStart).tickFormat(() => "").tickSize((-height) + (2 * margin.bottom)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        weekAxis.selectAll('text').remove();
        weekStart.forEach(tick => {
            const tickDate = new Date(tick);
            const label = formatDay(tickDate);
            svg.append("text")
             .attr("x", x(tick)! + 4)
             .attr("y", height - margin.bottom)
             .attr("text-anchor", "left")
             .attr("fill", "#FFE4D1") // can fill with hex #000000
             .style("font-size", `${(8 + Math.ceil(x.bandwidth() / 3))}px`)
             .text(label.toUpperCase())
             .attr("opacity", 0.6);
        });
        const dayAxis = svg.append("g")
           .attr("transform", `translate(0,${height - margin.bottom})`)
           .call(axisBottom(x).tickValues(stringList).tickFormat(() => "").tickSize((-height) + (2 * margin.bottom)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");

        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", line()
            .x(d => d.timestamp)
            .y(d => d.sma)
            );

        const svgNode = svg.node();
        if (svgNode === null) {
            console.error("Failed to create SVG node");
            return '';
        }
        return (svgNode.outerHTML);

    } else if (time === "3m") {
        // x axis
        const yearTicks = yearTick(stringList);
        const yearAxis = svg.append("g")
           .attr("transform", `translate(0,${height - margin.bottom})`)
           .call(axisBottom(x).tickValues(yearTicks).tickFormat(() => "").tickSize((-height) + (2 * margin.bottom)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        yearAxis.selectAll('text').remove();
        const monthTicks = monthTick(stringList);
        const monthAxis = svg.append("g")
           .attr("transform", `translate(0,${height - margin.bottom})`)
           .call(axisBottom(x).tickValues(monthTicks).tickFormat(() => "").tickSize((-height) + (2 * margin.bottom)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        monthAxis.selectAll('text').remove();
        monthTicks.slice(0, -1).forEach(tick => {
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
        const weekStart = weekStartTick(stringList);
        const weekAxis = svg.append("g")
           .attr("transform", `translate(0,${height - margin.bottom})`)
           .call(axisBottom(x).tickValues(weekStart).tickFormat(() => "").tickSize((-height) + (2 * margin.bottom)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        weekAxis.selectAll('text').remove();

        const svgNode = svg.node();
        if (svgNode === null) {
            console.error("Failed to create SVG node");
            return '';
        }
        return (svgNode.outerHTML);

    } else if (time === "6m") {
        // x axis
        const monthTicks = monthTick(stringList);
        monthTicks.slice(0, -1).forEach(tick => {
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
        const weekStart = weekStartTick(stringList);
        const weekAxis = svg.append("g")
           .attr("transform", `translate(0,${height - margin.bottom})`)
           .call(axisBottom(x).tickValues(weekStart).tickFormat(() => "").tickSize((-height) + (2 * margin.bottom)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        weekAxis.selectAll('text').remove();

        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", line()
            .x(d => d.timestamp)
            .y(d => d.sma)
            );
        const svgNode = svg.node();
        if (svgNode === null) {
            console.error("Failed to create SVG node");
            return '';
        }
        return (svgNode.outerHTML);

    } else if (time === "1y") {
        // x axis
        const yearTicks = yearTick(stringList);
        const yearAxis = svg.append("g")
           .attr("transform", `translate(0,${height - margin.bottom})`)
           .call(axisBottom(x).tickValues(yearTicks).tickFormat(() => "").tickSize((-height) + (2 * margin.bottom)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        yearAxis.selectAll('text').remove();
        const monthTicks = monthTick(stringList);
        const monthAxis = svg.append("g")
           .attr("transform", `translate(0,${height - margin.bottom})`)
           .call(axisBottom(x).tickValues(monthTicks).tickFormat(() => "").tickSize((-height) + (2 * margin.bottom)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        monthAxis.selectAll('text').remove();
        monthTicks.slice(0, -1).forEach(tick => {
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

        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", line()
            .x(d => d.timestamp)
            .y(d => d.sma)
            );
        const svgNode = svg.node();
        if (svgNode === null) {
            console.error("Failed to create SVG node");
            return '';
        }
        return (svgNode.outerHTML);

    } else if (time === "2y") {
        // x axis
        const yearTicks = yearTick(stringList);
        const yearAxis = svg.append("g")
           .attr("transform", `translate(0,${height - margin.bottom})`)
           .call(axisBottom(x).tickValues(yearTicks).tickFormat(() => "").tickSize((-height) + (2 * margin.bottom)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        yearAxis.selectAll('text').remove();
        const threeMTicks = threeMonthsTick(stringList);
        const monthAxis = svg.append("g")
           .attr("transform", `translate(0,${height - margin.bottom})`)
           .call(axisBottom(x).tickValues(threeMTicks).tickFormat(() => "").tickSize((-height) + (2 * margin.bottom)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        monthAxis.selectAll('text').remove();
        threeMTicks.slice(0, -1).forEach(tick => {
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

        svg.append("text")
            .attr("x", margin.left)
            .attr("y", height - margin.bottom)
            .attr("text-anchor", "center")
            .attr("fill", "#877B74")
            .style("font-size", `${width / 3}px`)
            .text(ticker.toUpperCase())
            .attr("opacity", 0.2);

        const svgNode = svg.node();
        if (svgNode === null) {
            console.error("Failed to create SVG node");
            return '';
        }
        return (svgNode.outerHTML);
    } else {

    }
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line()
        .x(d => d.timestamp)
        .y(d => d.sma)
        );
    const svgNode = svg.node();
    if (svgNode === null) {
        console.error("Failed to create SVG node");
        return '';
    }
    return (svgNode.outerHTML);
};
