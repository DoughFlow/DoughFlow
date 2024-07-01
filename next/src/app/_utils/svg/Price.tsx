import { PriceDataPoint } from "../fetchData";
import { scaleBand, scaleLinear, axisBottom, axisLeft, utcMonday, utcMonth,
         utcFormat, format, create } from "d3";
import { margin, yBuffered, centTick, tensTick, fivesTick, onesTick, yearTick,
         threeMonthsTick, monthTick, weekStartTick, dayTick, mobile_margin, C 
        } from "./Generate";


export const priceSvg = (data: PriceDataPoint[], height: number, width: number,
time: string, viewHeight: number): string => {

    const candleWidth = width / (data.length * 1.75);
    const candleOffset = candleWidth / 2;
    const ticker: string = data[0].ticker.toString();
    const stringList = data.map((d) => String(d.timestamp));
    const formatMonth = utcFormat("%b");
    const formatDay = utcFormat("%m/%d");
    const timeMin = Math.min(...data.map(d => +d.low_price));
    const timeMax = Math.max(...data.map(d => +d.high_price));
    const yDomain = yBuffered(timeMin, timeMax);
    const yRange = [height - mobile_margin.top, 0 + mobile_margin.bottom]

    const svg = create("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background", `${C.dfBlack}`);

    const y = scaleLinear()
        .range(yRange)
        .domain(yDomain);
    const x = scaleBand()
        .domain(stringList)
        .range([mobile_margin.left, width - mobile_margin.right]);

    // scale ticker text and put behind graph
    svg.append("text").backgroundTicker(width, height, ticker);

    // calculate tick marks, draw & label them
    svg.yAxisGenerator(width, yDomain, yRange);

    if (time === "1m") {
        // x axis
        const yearTicks = yearTick(stringList);
        const yearAxis = svg.append("g")
           .attr("transform", `translate(0,${height - mobile_margin.bottom})`)
           .call(axisBottom(x).tickValues(yearTicks).tickFormat(() => "").tickSize((-height) + (2 * mobile_margin.bottom)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        yearAxis.selectAll('text').remove();
        const monthTicks = monthTick(stringList);
        const monthAxis = svg.append("g")
           .attr("transform", `translate(0,${height - mobile_margin.bottom})`)
           .call(axisBottom(x).tickValues(monthTicks).tickFormat(() => "").tickSize((-height) + (2 * mobile_margin.bottom)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        monthAxis.selectAll('text').remove();
        const weekStart = weekStartTick(stringList);
        const weekAxis = svg.append("g")
           .attr("transform", `translate(0,${height - mobile_margin.bottom})`)
           .call(axisBottom(x).tickValues(weekStart).tickFormat(() => "").tickSize((-height) + (2 * mobile_margin.bottom)))
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
             .attr("y", height - mobile_margin.bottom)
             .attr("text-anchor", "left")
             .attr("fill", "#FFE4D1") // can fill with hex #000000
             .style("font-size", `${(8 + Math.ceil(x.bandwidth() / 3))}px`)
             .text(label.toUpperCase())
             .attr("opacity", 0.6);
        });
        const dayAxis = svg.append("g")
           .attr("transform", `translate(0,${height - mobile_margin.bottom})`)
           .call(axisBottom(x).tickValues(stringList).tickFormat(() => "").tickSize((-height) + (2 * mobile_margin.bottom)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
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

    } else if (time === "3m") {
        // x axis
        const yearTicks = yearTick(stringList);
        const yearAxis = svg.append("g")
           .attr("transform", `translate(0,${height - mobile_margin.bottom})`)
           .call(axisBottom(x).tickValues(yearTicks).tickFormat(() => "").tickSize((-height) + (2 * mobile_margin.bottom)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        yearAxis.selectAll('text').remove();
        const monthTicks = monthTick(stringList);
        const monthAxis = svg.append("g")
           .attr("transform", `translate(0,${height - mobile_margin.bottom})`)
           .call(axisBottom(x).tickValues(monthTicks).tickFormat(() => "").tickSize((-height) + (2 * mobile_margin.bottom)))
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
                .attr("y", height - mobile_margin.bottom)
                .attr("text-anchor", "left")
                .attr("fill", "#FFE4D1") // can fill with hex #000000
                .style("font-size", `${(16 + Math.ceil(x.bandwidth() * 3))}px`)
                .text(label.toUpperCase())
                .attr("opacity", 0.6);
        });
        const weekStart = weekStartTick(stringList);
        const weekAxis = svg.append("g")
           .attr("transform", `translate(0,${height - mobile_margin.bottom})`)
           .call(axisBottom(x).tickValues(weekStart).tickFormat(() => "").tickSize((-height) + (2 * mobile_margin.bottom)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        weekAxis.selectAll('text').remove();
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

    } else if (time === "6m") {
        // x axis
        const monthTicks = monthTick(stringList);
        monthTicks.slice(0, -1).forEach(tick => {
            const tickDate = new Date(tick);
            const label = formatMonth(tickDate);
            svg.append("text")
                .attr("x", x(tick)! + 4)
                .attr("y", height - mobile_margin.bottom)
                .attr("text-anchor", "left")
                .attr("fill", "#FFE4D1") // can fill with hex #000000
                .style("font-size", `${(16 + Math.ceil(x.bandwidth() * 3))}px`)
                .text(label.toUpperCase())
                .attr("opacity", 0.6);
        });
        const weekStart = weekStartTick(stringList);
        const weekAxis = svg.append("g")
           .attr("transform", `translate(0,${height - mobile_margin.bottom})`)
           .call(axisBottom(x).tickValues(weekStart).tickFormat(() => "").tickSize((-height) + (2 * mobile_margin.bottom)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        weekAxis.selectAll('text').remove();
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

    } else if (time === "1y") {
        // x axis
        const yearTicks = yearTick(stringList);
        const yearAxis = svg.append("g")
           .attr("transform", `translate(0,${height - mobile_margin.bottom})`)
           .call(axisBottom(x).tickValues(yearTicks).tickFormat(() => "").tickSize((-height) + (2 * mobile_margin.bottom)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        yearAxis.selectAll('text').remove();
        const monthTicks = monthTick(stringList);
        const monthAxis = svg.append("g")
           .attr("transform", `translate(0,${height - mobile_margin.bottom})`)
           .call(axisBottom(x).tickValues(monthTicks).tickFormat(() => "").tickSize((-height) + (2 * mobile_margin.bottom)))
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
                .attr("y", height - mobile_margin.bottom)
                .attr("text-anchor", "left")
                .attr("fill", "#FFE4D1") // can fill with hex #000000
                .style("font-size", `${(16 + Math.ceil(x.bandwidth() * 3))}px`)
                .text(label.toUpperCase())
                .attr("opacity", 0.6);
        });
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

    } else if (time === "2y") {
        // x axis
        const yearTicks = yearTick(stringList);
        const yearAxis = svg.append("g")
           .attr("transform", `translate(0,${height - mobile_margin.bottom})`)
           .call(axisBottom(x).tickValues(yearTicks).tickFormat(() => "").tickSize((-height) + (2 * mobile_margin.bottom)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        yearAxis.selectAll('text').remove();
        const threeMTicks = threeMonthsTick(stringList);
        const monthAxis = svg.append("g")
           .attr("transform", `translate(0,${height - mobile_margin.bottom})`)
           .call(axisBottom(x).tickValues(threeMTicks).tickFormat(() => "").tickSize((-height) + (2 * mobile_margin.bottom)))
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
                .attr("y", height - mobile_margin.bottom)
                .attr("text-anchor", "left")
                .attr("fill", "#FFE4D1") // can fill with hex #000000
                .style("font-size", `${(16 + Math.ceil(x.bandwidth() * 3))}px`)
                .text(label.toUpperCase())
                .attr("opacity", 0.6);
        });
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

    } else {
    }

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
