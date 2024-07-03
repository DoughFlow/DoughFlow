import { priceSvg } from "./Price"
import { volSvg } from "./Vol"
import { smaSvg } from "./Sma"
import { rsiSvg } from "./Rsi"
import { Stock } from "@/components/StockContext";
import * as d3 from "d3";
import {axisLeft} from "d3";

// globals
export const margin = { top: 16, right: 20, bottom: 16, left: 20 };
export const mobile_margin = { top: 0, right: 15, bottom: 10, left: 0};

// d3 helper functions
export const formatLargeInt = d3.format("~s")
export const formatYear = d3.utcFormat("'%y");
export const formatMonth = d3.utcFormat("%b");
export const formatDay = d3.utcFormat("%m/%d");

// colors
export enum C {

  "dfyellow" = "#FFBB84", // legacy-code support
  "dfBrown" = "#99775E",
  "dfWhite" = "#FFE4D1",
  "dfWhiteTwo" = "#FFEBDD",
  "dfGray" = "#877B74",
  "dfYellow" = "#FFBB84",
  "dfOrange" = "#FF9151",
  "dfRed" = "#510015",
  "dfGold" = "#FFB702",
  "dfBlack" = "#040107",
  "dfGreen" = "#058907",

}

// d3 prototype chained-method functions
 
// add functions to project-wide method declarations
declare module "d3" {
  interface Selection<GElement extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum> {
    backgroundTicker(width: number, height: number, ticker: string): this;}
  interface Selection<GElement extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum> {
    yAxisGenerator(width: number, yDomain: number[], yRange: number[]): this;}
  interface Selection<GElement extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum> {
    yTickGenerator(tickCall: string, width: number, yDomain: number[], yRange: number[]): this;}
  interface Selection<GElement extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum> {
    xAxisGenerator(width: number, height: number, xDomain: string[], xRange: number[]): this;}
  interface Selection<GElement extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum> {
    xTickGenerator(tickCall: string, fontSize: number, height: number, xDomain: string[], xRange: number[], t: boolean): this;}
}

// generate x-axis using xTickGenerator and "*Tick" functions
d3.selection.prototype.xAxisGenerator = function<T extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum>(this: d3.Selection<T, Datum, PElement, PDatum>, width: number, height: number, xDomain: string[], xRange: number[]) {

  const len = xDomain.length;
  return this.each(function () {
  const svg = d3.select(this as T);

  // mobile vertical graph
  if (width / height < .75) {
    if (len < 40) {
      svg.xTickGenerator("days", 0, height, xDomain, xRange, false)
      svg.xTickGenerator("weeks", 16, height, xDomain, xRange, false)}
    else if (len < 80) {
      svg.xTickGenerator("months", 18, height, xDomain, xRange, false)}
    else if (len < 180) {
      svg.xTickGenerator("months", 18, height, xDomain, xRange, false)}
    else if (len < 280) {
      svg.xTickGenerator("threeMonths", 18, height, xDomain, xRange, false)
      svg.xTickGenerator("years", 18, height, xDomain, xRange, false)}
    else {
      svg.xTickGenerator("years", 18, height, xDomain, xRange, false)}
  }

  // mobile + desktop widegraphs
  else if (width / height > 1.65 && width < 1350) {
    if (len < 40) {
      svg.xTickGenerator("days", 0, height, xDomain, xRange, true)
      svg.xTickGenerator("weeks", 26, height, xDomain, xRange, false)}
    else if (len < 80) {
      svg.xTickGenerator("weeks", 14, height, xDomain, xRange, true)
      svg.xTickGenerator("months", 32, height, xDomain, xRange, false)}
    else if (len < 180) {
      svg.xTickGenerator("weeks", 0, height, xDomain, xRange, true)
      svg.xTickGenerator("months", 18, height, xDomain, xRange, false)}
    else if (len < 280) {
      svg.xTickGenerator("years", 18, height, xDomain, xRange, false)
      svg.xTickGenerator("months", 16, height, xDomain, xRange, false)}
    else {
      svg.xTickGenerator("threeMonths", 18, height, xDomain, xRange, false)
      svg.xTickGenerator("years", 18, height, xDomain, xRange, false)}
  }

  // desktop small graph
  else if (width < 1350) {
    if (len < 40) {
      svg.xTickGenerator("days", 0, height, xDomain, xRange, true)
      svg.xTickGenerator("weeks", 26, height, xDomain, xRange, false)}
    else if (len < 80) {
      svg.xTickGenerator("weeks", 0, height, xDomain, xRange, true)
      svg.xTickGenerator("months", 32, height, xDomain, xRange, false)}
    else if (len < 180) {
      svg.xTickGenerator("weeks", 0, height, xDomain, xRange, true)
      svg.xTickGenerator("months", 18, height, xDomain, xRange, false)}
    else if (len < 280) {
      svg.xTickGenerator("years", 18, height, xDomain, xRange, false)
      svg.xTickGenerator("months", 12, height, xDomain, xRange, false)}
    else {
      svg.xTickGenerator("threeMonths", 18, height, xDomain, xRange, false)
      svg.xTickGenerator("years", 18, height, xDomain, xRange, false)}
  }

  // desktop main graph
  else {
    if (len < 40) {
      svg.xTickGenerator("days", 12, height, xDomain, xRange, true)
      svg.xTickGenerator("weeks", 38, height, xDomain, xRange, false)}
    else if (len < 80) {
      svg.xTickGenerator("weeks", 12, height, xDomain, xRange, true)
      svg.xTickGenerator("months", 38, height, xDomain, xRange, false)}
    else if (len < 180) {
      svg.xTickGenerator("weeks", 12, height, xDomain, xRange, true)
      svg.xTickGenerator("months", 38, height, xDomain, xRange, false)}
    else if (len < 280) {
      svg.xTickGenerator("years", 30, height, xDomain, xRange, false)
      svg.xTickGenerator("months", 38, height, xDomain, xRange, false)}
    else {
      svg.xTickGenerator("threeMonths", 38, height, xDomain, xRange, false)
      svg.xTickGenerator("years", 30, height, xDomain, xRange, false)}
  }
  });
}

// generate y-axis using yTickGenerator and "*Tick"functions
d3.selection.prototype.yAxisGenerator = function<T extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum>(this: d3.Selection<T, Datum, PElement, PDatum>, width: number, yDomain: number[], yRange: number[]) {
  const range = yDomain[1] - yDomain[0];

  return this.each(function () {
    const svg = d3.select(this as T);
    if (range < 20) {
      svg.yTickGenerator("ones", width, yDomain, yRange);
      svg.yTickGenerator("fives", width, yDomain, yRange);
      svg.yTickGenerator("tens", width, yDomain, yRange);
    } else if (range < 60) {
      svg.yTickGenerator("fives", width, yDomain, yRange);
      svg.yTickGenerator("tens", width, yDomain, yRange);
    } else if (range < 400) {
      // tens and cents on every graph for non-volume
      svg.yTickGenerator("tens", width, yDomain, yRange);
    }

    // is volume
    else {
      if (yDomain[1] < 2500000) {

        if (range < 500000) {
          svg.yTickGenerator("tenKs", width, yDomain, yRange);
          svg.yTickGenerator("hundredKs", width, yDomain, yRange);} 
        else if (range < 2500000) {
          svg.yTickGenerator("hundredKs", width, yDomain, yRange);}
        else if (range < 20000000) {
          svg.yTickGenerator("ms", width, yDomain, yRange);
          svg.yTickGenerator("tenMs", width, yDomain, yRange);} 
        else if (range < 200000000) {
          svg.yTickGenerator("tenMs", width, yDomain, yRange);
          svg.yTickGenerator("hundredMs", width, yDomain, yRange);} 
        else {
          svg.yTickGenerator("hundredMs", width, yDomain, yRange);}

      } 
      else {

        if (range < 20000000) {
          svg.yTickGenerator("ms", width, yDomain, yRange);
          svg.yTickGenerator("tenMs", width, yDomain, yRange);} 
        else if (range < 200000000) {
          svg.yTickGenerator("tenMs", width, yDomain, yRange);
          svg.yTickGenerator("hundredMs", width, yDomain, yRange);} 
        else {
          svg.yTickGenerator("hundredMs", width, yDomain, yRange);}

      }
    }

    // add hundreds to all graphs regardless of range
    if (range < 1000) {
    svg.yTickGenerator("cents", width, yDomain, yRange);
    }
});
}

// draw ticks and labels on y-axis
d3.selection.prototype.xTickGenerator = function<T extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum>(this: d3.Selection<T, Datum, PElement, PDatum>, tickCall:"days"|"Ldays"|"weeks"|"months"|"threeMonths"|"years", textSize: number, height: number, xDomain: string[], xRange: number[], t: boolean) {
  return this.each(function () {
    let initTextRight = true;
    const svg = d3.select(this as T);
    const x = d3.scaleBand()
           .range(xRange)
           .domain(xDomain)

    switch (tickCall) {

      case "days":        
        const LdayTicks = xDomain;
        svg.append("g")
            .attr("transform", `translate(0,${height - mobile_margin.bottom})`)
            .call(d3.axisBottom(x).tickValues(LdayTicks).tickFormat(() => "").tickSize((-height) + (2 * mobile_margin.bottom)))
            .call(g => g.select(".domain").remove())
            .attr("opacity", 0.2)
            .selectAll(".tick line")
            .attr("stroke", `${C.dfGray}`);
        LdayTicks.slice(1).forEach(tick => {
            const tickDate = new Date(tick);
            const label = formatDay(tickDate);
            svg.append("text")
                .attr("x", x(tick)! + 4)
                .attr("y", 
                t? mobile_margin.bottom : height - mobile_margin.bottom)
                .attr("text-anchor", "left")
                .attr("fill", `${C.dfWhite}`) // can fill with hex #000000
                .style("font-size", `${textSize}px`)
                .text(label.toUpperCase())
                .attr("opacity", 0.6);});
            break;

      case "weeks":        
      const weekTicks = tradingWeekTick(xDomain)
        svg.append("g")
            .attr("transform", `translate(0,${height - mobile_margin.bottom})`)
            .call(d3.axisBottom(x).tickValues(weekTicks).tickFormat(() => "").tickSize((-height) + (2*mobile_margin.bottom)))
            .call(g => g.select(".domain").remove())
            .attr("opacity", 0.24)
            .selectAll(".tick line")
            .attr("stroke", `${C.dfGold}`);
        weekTicks.slice(0,-1).forEach(tick => {
            const tickDate = new Date(tick);
            const label = formatDay(tickDate);
            svg.append("text")
                .attr("x", x(tick)! + 4)
                .attr("y", 
                t ? mobile_margin.bottom : height - mobile_margin.bottom)
                .attr("transform", `translate(
                ${xRange[1] > 1000 ? 22 : 6}, 0)`)
                .attr("text-anchor", "left")
                .attr("fill", `${C.dfWhite}`) // can fill with hex #000000
                .style("font-size", `${textSize}px`)
                .text(label.toUpperCase())
                .attr("opacity", 0.6);});
            break;

      case "months":        
        let monthTicks = monthTick(xDomain)
        svg.append("g")
            .attr("transform", `translate(0,${height - mobile_margin.bottom})`)
            .call(d3.axisBottom(x).tickValues(monthTicks).tickFormat(() => "").tickSize((-height) + (2 * mobile_margin.bottom)))
            .call(g => g.select(".domain").remove())
            .attr("opacity", 0.45)
            .selectAll(".tick line")
            .attr("stroke", `${C.dfYellow}`);
        monthTicks.slice(0, -1).forEach(tick => {
            const tickDate = new Date(tick);
            const label = formatMonth(tickDate);
            svg.append("text")
                .attr("x", x(tick)! + 4)
                .attr("y", 
                t ? mobile_margin.bottom : height - mobile_margin.bottom)
                .attr("transform", 
                initTextRight ? (initTextRight = false, `translate(${textSize/1.5}, 0)`) : null)
                .attr("text-anchor", "left")
                .attr("fill", "#FFE4D1") // can fill with hex #000000
                .style("font-size", `${textSize}px`)
                .text(label.toUpperCase())
                .attr("opacity", 0.6);});
            break;

      case "threeMonths":        
        const threeMonthTicks = threeMonthTick(xDomain)
        svg.append("g")
            .attr("transform", `translate(0,${height - mobile_margin.bottom})`)
            .call(d3.axisBottom(x).tickValues(threeMonthTicks).tickFormat(() => "").tickSize((-height) + (2 * mobile_margin.bottom)))
            .call(g => g.select(".domain").remove())
            .attr("opacity", 0.3)
            .selectAll(".tick line")
            .attr("stroke", "#FFE4D1");
        threeMonthTicks.slice(0, -1).forEach(tick => {
            const tickDate = new Date(tick);
            const label = formatMonth(tickDate);
            svg.append("text")
                .attr("x", x(tick)! + 4)
                .attr("y", height - mobile_margin.bottom)
                .attr("transform",
                initTextRight ? (initTextRight = false, "translate(0, 0)") : null)
                .attr("text-anchor", "left")
                .attr("fill", "#FFE4D1") // can fill with hex #000000
                .style("font-size", `${textSize}px`)
                .text(label.toUpperCase())
                .attr("opacity", 0.6);});
            break;

      case "years":
        const yearTicks = yearTick(xDomain).slice(1);
        yearTicks.forEach(tick => {
          const tickDate = new Date(tick);
          const label = formatYear(tickDate);
          svg.append("text")
              .attr("x", x(tick)! + 4)
              .attr("y", height - mobile_margin.bottom - textSize*1.15)
              .attr("text-anchor", "left")
              .attr("fill", `${C.dfOrange}`) // can fill with hex #000000
              .style("font-size", `${textSize}px`)
              .text(label.toUpperCase())
              .text(label.toUpperCase())
              .attr("opacity", 0.6);});
          break;
    }
  });
}

// draw ticks and labels on y-axis
d3.selection.prototype.yTickGenerator = function<T extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum>(this: d3.Selection<T, Datum, PElement, PDatum>, tickCall: string, width: number, yDomain: number[], yRange: number[]) {

  return this.each(function () {
    // clean data
    if (yDomain[0] < 0) {yDomain[0] *= -1}
    const svg = d3.select(this as T);
    const y = d3.scaleLinear()
           .range(yRange)
           .domain(yDomain)

    switch (tickCall) {

      case "ones":
        const ones = onesTick(yDomain[0], yDomain[1]);
        svg.append("g")
            .attr("transform", `translate(${mobile_margin.left + 3}, 0)`)
            .call(d3.axisLeft(y)
                .tickValues(ones)
                .tickFormat(() => "")
                .tickSize((-width) + (2 * mobile_margin.left)))
            .call(g => g.select(".domain").remove())
            .attr("opacity", 0.16)
            .selectAll(".tick line")
            .attr("stroke", `${C.dfGold}`);
        ones.forEach(tick => {
            svg.append("text")
                .attr("x", mobile_margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "12")
                .text(`${d3.format(",")(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);});
            break;

      case "fives":
        const fives = fivesTick(yDomain[0], yDomain[1]);
        svg.append("g")
            .attr("transform", `translate(${mobile_margin.left + 3}, 0)`)
            .call(d3.axisLeft(y)
                 .tickValues(fives)
                 .tickFormat(() => "")
                 .tickSize((-width) + (2 * mobile_margin.left)))
            .call(g => g.select(".domain").remove())
            .attr("opacity", 0.25)
            .selectAll(".tick line")
            .attr("stroke", `${C.dfGray}`);
        fives.forEach(tick => {
            svg.append("text")
                .attr("x", mobile_margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "12")
                .text(`${d3.format(",")(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);});
            break;

      case "tens":
        const tens = tensTick(yDomain[0], yDomain[1]);
        svg.append("g")
            .attr("transform", `translate(${mobile_margin.left + 3}, 0)`)
            .call(d3.axisLeft(y)
                 .tickValues(tens)
                 .tickFormat(() => "")
                 .tickSize((-width) + (2 * mobile_margin.left)))
            .call(g => g.select(".domain").remove())
            .attr("opacity", 0.11)
            .selectAll(".tick line")
            .attr("stroke", `${C.dfGold}`);
        tens.forEach(tick => {
            svg.append("text")
                .attr("x", mobile_margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "14")
                .text(`${d3.format(",")(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);});
            break;

      case "cents":
        const cents = centsTick(yDomain[0], yDomain[1]);
        const centsAxis = svg.append("g")
            .attr("transform", `translate(${mobile_margin.left + 3}, 0)`)
            .call(axisLeft(y)
                 .tickValues(cents)
                 .tickFormat(() => "")
                 .tickSize((-width) + (2 * mobile_margin.left)))
            .call(g => g.select(".domain").remove())
            .attr("opacity", 0.40)
            .selectAll(".tick line")
            .attr("stroke", `${C.dfBrown}`);
        cents.forEach(tick => {
            svg.append("text")
                .attr("x", mobile_margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "16")
                .text(`${d3.format(",")(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);});
            break;

      case "tenKs":
        const tenKs = tenKsTick(yDomain[0], yDomain[1]);
        const tenKAxis = svg.append("g")
            .attr("transform", `translate(${mobile_margin.left + 3}, 0)`)
            .call(axisLeft(y)
                 .tickValues(tenKs)
                 .tickFormat(() => "")
                 .tickSize((-width) + (2 * mobile_margin.left)))
            .call(g => g.select(".domain").remove())
            .attr("opacity", 0.40)
            .selectAll(".tick line")
            .attr("stroke", `${C.dfBrown}`);
        tenKs.forEach(tick => {
            svg.append("text")
                .attr("x", mobile_margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "16")
                .text(`${formatLargeInt(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);});
            break;

      case "hundredKs":
        console.log("im called");
        const hundredKs = hundredKsTick(yDomain[0], yDomain[1]);
        const hundredKsAxis = svg.append("g")
            .attr("transform", `translate(${mobile_margin.left + 3}, 0)`)
            .call(axisLeft(y)
                 .tickValues(hundredKs)
                 .tickFormat(() => "")
                 .tickSize((-width) + (2 * mobile_margin.left)))
            .call(g => g.select(".domain").remove())
            .attr("opacity", 0.40)
            .selectAll(".tick line")
            .attr("stroke", `${C.dfBrown}`);
        hundredKs.forEach(tick => {
            svg.append("text")
                .attr("x", mobile_margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "16")
                .text(`${formatLargeInt(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);});
            break;

      case "ms":
        const ms = milsTick(yDomain[0], yDomain[1]);
        const msAxis = svg.append("g")
            .attr("transform", `translate(${mobile_margin.left + 3}, 0)`)
            .call(axisLeft(y)
                 .tickValues(ms)
                 .tickFormat(() => "")
                 .tickSize((-width) + (2 * mobile_margin.left)))
            .call(g => g.select(".domain").remove())
            .attr("opacity", 0.40)
            .selectAll(".tick line")
            .attr("stroke", `${C.dfBrown}`);
        ms.forEach(tick => {
            svg.append("text")
                .attr("x", mobile_margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "16")
                .text(`${formatLargeInt(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);});
            break;

      case "tenMs":
        const tenMs = tenMilsTick(yDomain[0], yDomain[1]);
        const tenMsAxis = svg.append("g")
            .attr("transform", `translate(${mobile_margin.left + 3}, 0)`)
            .call(axisLeft(y)
                 .tickValues(tenMs)
                 .tickFormat(() => "")
                 .tickSize((-width) + (2 * mobile_margin.left)))
            .call(g => g.select(".domain").remove())
            .attr("opacity", 0.40)
            .selectAll(".tick line")
            .attr("stroke", `${C.dfBrown}`);
        tenMs.forEach(tick => {
            svg.append("text")
                .attr("x", mobile_margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "16")
                .text(`${formatLargeInt(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);});
            break;

      default: 
        const hundredMs = hundredMilsTick(yDomain[0], yDomain[1]);
        const hundredMsAxis = svg.append("g")
            .attr("transform", `translate(${mobile_margin.left + 3}, 0)`)
            .call(axisLeft(y)
                 .tickValues(hundredMs)
                 .tickFormat(() => "")
                 .tickSize((-width) + (2 * mobile_margin.left)))
            .call(g => g.select(".domain").remove())
            .attr("opacity", 0.40)
            .selectAll(".tick line")
            .attr("stroke", `${C.dfBrown}`);
        hundredMs.forEach(tick => {
            svg.append("text")
                .attr("x", mobile_margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "16")
                .text(`${formatLargeInt(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);});
            break;
    }
  });
}

// format and draw the company's ticker on graph background
d3.selection.prototype.backgroundTicker = function<T extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum>(this: d3.Selection<T, Datum, PElement, PDatum>, width: number, height: number, ticker: string) {

  return this.each(function () {
    const svg = d3.select(this as T);
    svg.append("text")

    // mobile view (1 stock vertical view)
    if (height > 650 && width / height < .69) {
        svg.attr("x", `0px`)
        svg.attr("y", `0px`)
        height < 800 ? svg.attr("transform", "translate(25 100) rotate(69)")
                     : svg.attr("transform", "translate(25 175) rotate(69)")
        svg.attr("font-size", `${width*.525}px`)}
    
    // desktop and horizontal view mobile
    else {
        svg.attr("x", `${mobile_margin.right*2}px`)
        .attr("y", `${height*.93}px`)
        .attr("font-size", `${width*.25}px`)
    }

    // global background styles
    svg.attr("text-anchor", "center")
    svg.attr("fill", `${C.dfYellow}`)
    svg.attr("opacity", 0.15);
    svg.text(ticker.toUpperCase());
});
}

// add functions to project-wide method declarations
declare module "d3" {
  interface Selection<GElement extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum> {
    backgroundTicker(width: number, height: number, ticker: string): this;}
  interface Selection<GElement extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum> {
    yAxisGenerator(width: number, yDomain: number[], yRange: number[]): this;}
  interface Selection<GElement extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum> {
    yTickGenerator(tickCall: string, width: number, yDomain: number[], yRange: number[]): this;}
  interface Selection<GElement extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum> {
    xAxisGenerator(width: number, height: number, xDomain: string[], xRange: number[]): this;}
  interface Selection<GElement extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum> {
    xTickGenerator(tickCall: string, fontSize: number, height: number, xDomain: string[], xRange: number[], L: boolean): this;}
}

export const yBuffered = (minPrice: number, maxPrice: number): [number, number] => {
  const range = maxPrice - minPrice;
  const bufferPercentage = .085;
  const bufferedMinPrice = minPrice - range * bufferPercentage;
  const bufferedMaxPrice = maxPrice + range * bufferPercentage;
  return [bufferedMinPrice, bufferedMaxPrice];
}

// x and y -axis tick array creation functions
export const hundredMilsTick = (min: number, max: number): number[] => {
  const hundredMils: number[] = [];
  for (let i = Math.ceil(min / 100000000) * 100000000; i <= max; 
    i += 100000000) {
    hundredMils.push(i);
  }
  return hundredMils;
};

export const tenMilsTick = (min: number, max: number): number[] => {
  const tenMils: number[] = [];
  for (let i = Math.ceil(min / 10000000) * 10000000; i <= max; i += 10000000) {
    tenMils.push(i);
  }
  return tenMils;
};

export const milsTick = (min: number, max: number): number[] => {
  const mils: number[] = [];
  for (let i = Math.ceil(min / 1000000) * 1000000; i <= max; i += 1000000) {
    mils.push(i);
  }
  return mils;
};

export const hundredKsTick = (min: number, max: number): number[] => {
  const hundredKs: number[] = [];
  for (let i = Math.ceil(min / 100000) * 100000; i <= max; i += 100000) {
    hundredKs.push(i);
  }
  return hundredKs;
};

export const tenKsTick = (min: number, max: number): number[] => {
  const tenKs: number[] = [];
  for (let i = Math.ceil(min / 10000) * 10000; i <= max; i += 10000) {
    tenKs.push(i);
  }
  return tenKs;
};

export const centsTick = (min: number, max: number): number[] => {
  const cents: number[] = [];
  for (let i = Math.ceil(min / 100) * 100; i <= max; i += 100) {
    cents.push(i);
  }
  return cents;
};

export const tensTick = (min: number, max: number): number[] => {
  const tens: number[] = [];
  for (let i = Math.ceil(min / 10) * 10; i <= max; i += 10) {
    if (i % 100 !== 0) {
      tens.push(i);
    }
  }
  return tens;
};

export const fivesTick = (min: number, max: number): number[] => {
  const cents = centsTick(min, max);
  const tens = tensTick(min, max);
  const fives: number[] = [];
  for (let i = Math.ceil(min / 5) * 5; i <= max; i += 5) {
    if (!cents.includes(i) && !tens.includes(i)) {
      fives.push(i);
    }
  }
  return fives;
};

export const onesTick = (min: number, max: number): number[] => {
  const cents = centsTick(min, max);
  const tens = tensTick(min, max);
  const fives = fivesTick(min, max);
  const ones: number[] = [];
  for (let i = Math.ceil(min); i <= max; i++) {
    if (!cents.includes(i) && !tens.includes(i) && !fives.includes(i)) {
      ones.push(i);
    }
  }
  return ones;
};


export const yearTick = (stringList: string[]): string[] => {
  const ticks: string[] = [];
  let lastYear: Date | null = null;
  stringList.forEach(str => {
    const date = new Date(str);
    const startOfYear = d3.utcYear.floor(date);
    if (!lastYear || startOfYear > lastYear) {
      ticks.push(str);
      lastYear = startOfYear;
    }
  });
  return ticks;
};

export const threeMonthTick = (stringList: string[]): string[] => {
  const years = yearTick(stringList);
  const ticks: string[] = [];
  let lastQuarter: Date | null = null;
  stringList.forEach(str => {
    const date = new Date(str);
    const month = date.getUTCMonth();
    const quarterStart = new Date(Date.UTC(date.getUTCFullYear(), Math.floor(month / 3) * 3, 1));
    if ((!lastQuarter || quarterStart > lastQuarter) && !years.includes(str)) {
      ticks.push(str);
      lastQuarter = quarterStart;
    }
  });
  return ticks;
};

export const monthTick = (stringList: string[]): string[] => {
  const years = yearTick(stringList);
  const ticks: string[] = [];
  let lastMonth: Date | null = null;
  stringList.forEach(str => {
    const date = new Date(str);
    const startOfMonth = d3.utcMonth.floor(date);
    if ((!lastMonth || startOfMonth > lastMonth) && !years.includes(str)) {
      ticks.push(str);
      lastMonth = startOfMonth;
    }
  });
  return ticks;
};

export const tradingWeekTick = (stringList: string[]): string[] => {

  const ticks: string[] = []
  stringList.forEach((str, index) => {
    if (index % 5 === 0) {ticks.push(str);};
  });

  return ticks;
};

export const dayTick = (stringList: string[]): string[] => {

  const ticks: string[] = []
  stringList.forEach((str, index) => {
    if (index > 1 && index % 5 === 0) {null}
    else {ticks.push(str);}
  });

  return ticks;
}; 

export const generateSvg =  (data: any, stock: Stock, height: number, width: number): string => {
        if (stock.value === "price") {
            const svg = priceSvg(data, height, width);
            return svg;
        } else if (stock.value === "vol") {
            const svg = volSvg(data, height, width, stock.ticker);
            return svg;
        } else if (stock.value === "sma") {
            const svg = smaSvg(data, height, width, stock.ticker);
            return svg;
        } else {
            const svg = rsiSvg(data, height, width, stock.ticker);
            return svg;
        }
}
