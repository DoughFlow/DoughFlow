import { PriceDataPoint } from "../fetchData";
// import {
//     scaleBand,
//     axisBottom,
//     utcMonday,
//     utcMonth,
//     utcFormat,
//     format,
//     create
// } from "d3";
import * as d3 from "d3";
import { generateYTickMarks } from "./Generate";


export const smPriceSvg = (data: PriceDataPoint[], height: number, width: number): string => {
    // const margin = {top: 16, right: 20, bottom: 16, left: 20};
    // const ticker: string = data[0].ticker.toString();
    // const stringList = data.map((d) => String(d.timestamp));
    // const candleWidth = width / (data.length * 1.75);
    // const candleOffset = candleWidth / 2;
    // const minPrice = Math.min(...data.map(d => +d.low_price));
    // const maxPrice = Math.max(...data.map(d => +d.high_price));
    // const range = maxPrice - minPrice;
    // const bufferPercentage = 0.1;
    // const bufferedMinPrice = minPrice - range * bufferPercentage;
    // const bufferedMaxPrice = maxPrice + range * bufferPercentage;
    // const yDomain = [bufferedMinPrice, bufferedMaxPrice];
    // const monthValues = (): string[] => {
    //     const ticks: string[] = [];
    //     let lastMonth: Date | null = null;
    //     stringList.forEach(str => {
    //       const date = new Date(str);
    //       const startOfMonth = utcMonth.floor(date);
    //       if (!lastMonth || startOfMonth > lastMonth) {
    //         ticks.push(str);
    //         lastMonth = startOfMonth;
    //       } else if (utcMonday(date)) {

    //       }
    //     })
    //     return ticks;
    // };

  console.log(height, width);
  // less than 400px each needs a style of its own
  // 
  const { 
    scaleBand,
    axisBottom,
    utcMonday,
    utcMonth,
    utcFormat,
    format,
    create
  } = d3;
  const ticker: string = data[0].ticker.toString();
  const stringList = data.map((d) => String(d.timestamp));
  const formatMonth = utcFormat("%b");
  const monthValues = (): string[] => {
    const ticks: string[] = [];
    let lastMonth: Date | null = null;
    stringList.forEach(str => {
      const date = new Date(str);
      const startOfMonth = utcMonth.floor(date);
      if (!lastMonth || startOfMonth > lastMonth) {
        ticks.push(str);
        lastMonth = startOfMonth;
      } else if (utcMonday(date)) {
        
      }
    })
    return ticks;
  };
  const weekStartValues = (): string[] => {
    const ticks: string[] = [];
    let lastWeekStart: Date | null = null;
    stringList.forEach(str => {
      const date = new Date(str);
      const weekStart = new Date(date);
      weekStart.setUTCDate(date.getUTCDate() - date.getUTCDay() + 1);
      if (!lastWeekStart || weekStart > lastWeekStart) {
        ticks.push(str);
        lastWeekStart = weekStart;
      }
    });
    return ticks;
  };
  const weekStartTicks = weekStartValues();
  const monthTicks = monthValues();
  const monthLabels = monthValues().slice(0, -1);
  const margin = {top: 16, right: 20, bottom: 16, left: 20};
  const candleWidth = width / (data.length * 1.75);
  const candleOffset = candleWidth / 2;
  const minPrice = Math.min(...data.map(d => +d.low_price));
  const maxPrice = Math.max(...data.map(d => +d.high_price));
  const range = maxPrice - minPrice;
  const bufferPercentage = 0.1;
  const bufferedMinPrice = minPrice - range * bufferPercentage;
  const bufferedMaxPrice = maxPrice + range * bufferPercentage;
  const yDomain = [bufferedMinPrice, bufferedMaxPrice];
  const { tens, fives, ones } = generateYTickMarks(bufferedMinPrice, bufferedMaxPrice);
  const y = d3.scaleLinear()
    .range([height - margin.top, 0 + margin.bottom])
    .domain(yDomain);
  const svg = create("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "transparent")
  const yAxis = svg.append("g")
    .attr("transform", `translate(${margin.left + 3}, 0)`)
    .call(d3.axisLeft(y)
          .tickValues(tens)
          .tickFormat(() => "")
          .tickSize((-width) + (2 * margin.left)))
    .call(g => g.select(".domain").remove())
    .attr("opacity", 0.3)
    .selectAll(".tick line")
    .attr("stroke", "#FFE4D1");
  yAxis.selectAll('text').remove();
  const fivesAxis = svg.append("g")
    .attr("transform", `translate(${margin.left + 3}, 0)`)
    .call(d3.axisLeft(y)
          .tickValues(fives)
          .tickFormat(() => "")
          .tickSize((-width) + (2 * margin.left)))
    .call(g => g.select(".domain").remove())
    .attr("opacity", 0.3)
    .selectAll(".tick line")
    .attr("stroke", "#FF9151");
  fivesAxis.selectAll('text').remove();
  const onesAxis = svg.append("g")
    .attr("transform", `translate(${margin.left + 3}, 0)`)
    .call(d3.axisLeft(y)
          .tickValues(ones)
          .tickFormat(() => "")
          .tickSize((-width) + (2 * margin.left)))
    .call(g => g.select(".domain").remove())
    .attr("opacity", 0.2)
    .selectAll(".tick line")
    .attr("stroke", "#99775E");
  onesAxis.selectAll('text').remove();
  const x = scaleBand()
    .domain(stringList)
    .range([margin.left, width - margin.right]);
  const xAxis = svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(axisBottom(x).tickValues(monthTicks).tickFormat(() => "").tickSize((-height) + (2 * margin.bottom)))
    .call(g => g.select(".domain").remove())
    .attr("opacity", 0.3)
    .selectAll(".tick line")
    .attr("stroke", "#FFE4D1");
  xAxis.selectAll('text').remove();
  const mondayAxis = svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(axisBottom(x).tickValues(weekStartTicks).tickFormat(() => "").tickSize((-height) + (2 * margin.bottom)))
    .call(g => g.select(".domain").remove())
    .attr("opacity", 0.2)
    .selectAll(".tick line")
    .attr("stroke", "orange");
  mondayAxis.selectAll('text').remove();
  const numberofgraphs = 4;
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

  ones.forEach(tick => {
    svg.append("text")
      .attr("x", margin.left + 6)
      .attr("y", y(tick))
      .attr("text-anchor", "left")
      .attr("fill", "#99775E")
      .style("font-size", "12")
      .text(`${format(",")(tick)}`) // Formatting tick value
      .attr("opacity", 0.3);
  });

  svg.append("text")
      .attr("x", margin.left)
      .attr("y", height - margin.bottom)
      .attr("text-anchor", "center")
      .attr("fill", "#877B74")
      .style("font-size", `${height / 2.5}px`)
      .text(ticker)
      .attr("opacity", 0.2);

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
    return "";
};

