import { PriceDataPoint } from "../fetchData";
import {
    scaleBand, scaleLinear, axisBottom, axisLeft, utcMonday, utcMonth,
    utcFormat, format, create
} from "d3";
import { 
    margin, yBuffered, centTick, tensTick, fivesTick, onesTick, yearTick,
    threeMonthsTick, monthTick, weekStartTick, dayTick
} from "./Generate";



export const smPriceSvg = (data: PriceDataPoint[], height: number, width: number, time: string): string => {
    const candleWidth = width / (data.length * 1.75);
    const candleOffset = candleWidth / 2;
    const ticker: string = data[0].ticker.toString();
    const stringList = data.map((d) => String(d.timestamp));
    const formatMonth = utcFormat("%b");
    const formatDay = utcFormat("%m/%d");
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

    const cents = centTick(yDomain[0], yDomain[1]);
    const centsAxis = svg.append("g")
       .attr("transform", `translate(${margin.left + 3}, 0)`)
       .call(axisLeft(y)
             .tickValues(cents)
             .tickFormat(() => "")
             .tickSize((-width) + (2 * margin.left)))
       .call(g => g.select(".domain").remove())
       .attr("opacity", 0.3)
       .selectAll(".tick line")
       .attr("stroke", "#FFE4D1");
    centsAxis.selectAll('text').remove();
    cents.forEach(tick => {
        svg.append("text")
            .attr("x", margin.left + 6)
            .attr("y", y(tick))
            .attr("text-anchor", "left")
            .attr("fill", "#FF9151")
            .style("font-size", "12")
            .text(`${format(",")(tick)}`) // Formatting tick value
            .attr("opacity", 0.3);
    });
    if (yDomain[1] - yDomain[0] < 20) {
        // y axis
        const tens = tensTick(yDomain[0], yDomain[1]);
        const tensAxis = svg.append("g")
           .attr("transform", `translate(${margin.left + 3}, 0)`)
           .call(axisLeft(y)
                 .tickValues(tens)
                 .tickFormat(() => "")
                 .tickSize((-width) + (2 * margin.left)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        tensAxis.selectAll('text').remove();
        tens.forEach(tick => {
            svg.append("text")
                .attr("x", margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "12")
                .text(`${format(",")(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);
        });
        const fives = fivesTick(yDomain[0], yDomain[1]);
        const fivesAxis = svg.append("g")
           .attr("transform", `translate(${margin.left + 3}, 0)`)
           .call(axisLeft(y)
                 .tickValues(fives)
                 .tickFormat(() => "")
                 .tickSize((-width) + (2 * margin.left)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        fivesAxis.selectAll('text').remove();
        fives.forEach(tick => {
            svg.append("text")
                .attr("x", margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "12")
                .text(`${format(",")(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);
        });
        const ones = onesTick(yDomain[0], yDomain[1]);
        const onesAxis = svg.append("g")
           .attr("transform", `translate(${margin.left + 3}, 0)`)
           .call(axisLeft(y)
                 .tickValues(ones)
                 .tickFormat(() => "")
                 .tickSize((-width) + (2 * margin.left)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        onesAxis.selectAll('text').remove();
        ones.forEach(tick => {
            svg.append("text")
                .attr("x", margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "12")
                .text(`${format(",")(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);
        });
    } else if (yDomain[1] - yDomain[0] < 40) {
        const tens = tensTick(yDomain[0], yDomain[1]);
        const tensAxis = svg.append("g")
           .attr("transform", `translate(${margin.left + 3}, 0)`)
           .call(axisLeft(y)
                 .tickValues(tens)
                 .tickFormat(() => "")
                 .tickSize((-width) + (2 * margin.left)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        tensAxis.selectAll('text').remove();
        tens.forEach(tick => {
            svg.append("text")
                .attr("x", margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "12")
                .text(`${format(",")(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);
        });
        const fives = fivesTick(yDomain[0], yDomain[1]);
        const fivesAxis = svg.append("g")
           .attr("transform", `translate(${margin.left + 3}, 0)`)
           .call(axisLeft(y)
                 .tickValues(fives)
                 .tickFormat(() => "")
                 .tickSize((-width) + (2 * margin.left)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        fivesAxis.selectAll('text').remove();
        fives.forEach(tick => {
            svg.append("text")
                .attr("x", margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "12")
                .text(`${format(",")(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);
        });
    } else {
        const tens = tensTick(yDomain[0], yDomain[1]);
        const tensAxis = svg.append("g")
           .attr("transform", `translate(${margin.left + 3}, 0)`)
           .call(axisLeft(y)
                 .tickValues(tens)
                 .tickFormat(() => "")
                 .tickSize((-width) + (2 * margin.left)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        tensAxis.selectAll('text').remove();
        tens.forEach(tick => {
            svg.append("text")
                .attr("x", margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "12")
                .text(`${format(",")(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);
        });
    }
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

export const priceSvg = (data: PriceDataPoint[], height: number, width: number, time: string): string => {
    const candleWidth = width / (data.length * 1.75);
    const candleOffset = candleWidth / 2;
    const ticker: string = data[0].ticker.toString();
    const stringList = data.map((d) => String(d.timestamp));
    const formatMonth = utcFormat("%b");
    const formatDay = utcFormat("%m/%d");
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

    const cents = centTick(yDomain[0], yDomain[1]);
    const centsAxis = svg.append("g")
       .attr("transform", `translate(${margin.left + 3}, 0)`)
       .call(axisLeft(y)
             .tickValues(cents)
             .tickFormat(() => "")
             .tickSize((-width) + (2 * margin.left)))
       .call(g => g.select(".domain").remove())
       .attr("opacity", 0.3)
       .selectAll(".tick line")
       .attr("stroke", "#FFE4D1");
    centsAxis.selectAll('text').remove();
    cents.forEach(tick => {
        svg.append("text")
            .attr("x", margin.left + 6)
            .attr("y", y(tick))
            .attr("text-anchor", "left")
            .attr("fill", "#FF9151")
            .style("font-size", "12")
            .text(`${format(",")(tick)}`) // Formatting tick value
            .attr("opacity", 0.3);
    });
    if (yDomain[1] - yDomain[0] < 20) {
        // y axis
        const tens = tensTick(yDomain[0], yDomain[1]);
        const tensAxis = svg.append("g")
           .attr("transform", `translate(${margin.left + 3}, 0)`)
           .call(axisLeft(y)
                 .tickValues(tens)
                 .tickFormat(() => "")
                 .tickSize((-width) + (2 * margin.left)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        tensAxis.selectAll('text').remove();
        tens.forEach(tick => {
            svg.append("text")
                .attr("x", margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "12")
                .text(`${format(",")(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);
        });
        const fives = fivesTick(yDomain[0], yDomain[1]);
        const fivesAxis = svg.append("g")
           .attr("transform", `translate(${margin.left + 3}, 0)`)
           .call(axisLeft(y)
                 .tickValues(fives)
                 .tickFormat(() => "")
                 .tickSize((-width) + (2 * margin.left)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        fivesAxis.selectAll('text').remove();
        fives.forEach(tick => {
            svg.append("text")
                .attr("x", margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "12")
                .text(`${format(",")(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);
        });
        const ones = onesTick(yDomain[0], yDomain[1]);
        const onesAxis = svg.append("g")
           .attr("transform", `translate(${margin.left + 3}, 0)`)
           .call(axisLeft(y)
                 .tickValues(ones)
                 .tickFormat(() => "")
                 .tickSize((-width) + (2 * margin.left)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        onesAxis.selectAll('text').remove();
        ones.forEach(tick => {
            svg.append("text")
                .attr("x", margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "12")
                .text(`${format(",")(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);
        });
    } else if (yDomain[1] - yDomain[0] < 40) {
        const tens = tensTick(yDomain[0], yDomain[1]);
        const tensAxis = svg.append("g")
           .attr("transform", `translate(${margin.left + 3}, 0)`)
           .call(axisLeft(y)
                 .tickValues(tens)
                 .tickFormat(() => "")
                 .tickSize((-width) + (2 * margin.left)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        tensAxis.selectAll('text').remove();
        tens.forEach(tick => {
            svg.append("text")
                .attr("x", margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "12")
                .text(`${format(",")(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);
        });
        const fives = fivesTick(yDomain[0], yDomain[1]);
        const fivesAxis = svg.append("g")
           .attr("transform", `translate(${margin.left + 3}, 0)`)
           .call(axisLeft(y)
                 .tickValues(fives)
                 .tickFormat(() => "")
                 .tickSize((-width) + (2 * margin.left)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        fivesAxis.selectAll('text').remove();
        fives.forEach(tick => {
            svg.append("text")
                .attr("x", margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "12")
                .text(`${format(",")(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);
        });
    } else {
        const tens = tensTick(yDomain[0], yDomain[1]);
        const tensAxis = svg.append("g")
           .attr("transform", `translate(${margin.left + 3}, 0)`)
           .call(axisLeft(y)
                 .tickValues(tens)
                 .tickFormat(() => "")
                 .tickSize((-width) + (2 * margin.left)))
           .call(g => g.select(".domain").remove())
           .attr("opacity", 0.3)
           .selectAll(".tick line")
           .attr("stroke", "#FFE4D1");
        tensAxis.selectAll('text').remove();
        tens.forEach(tick => {
            svg.append("text")
                .attr("x", margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "12")
                .text(`${format(",")(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);
        });
    }
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

