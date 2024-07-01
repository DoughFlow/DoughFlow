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

// generate y-axis using tickGenerator and ticks functions
d3.selection.prototype.yAxisGenerator = function<T extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum>(this: d3.Selection<T, Datum, PElement, PDatum>, width: number, yDomain: number[], yRange: number[]) {
  console.log(yDomain);
  const range = yDomain[1] - yDomain[0];

  return this.each(function () {
    const svg = d3.select(this as T);
    if (range < 20) {
      svg.tickGenerator("ones", width, yDomain, yRange);
      svg.tickGenerator("fives", width, yDomain, yRange);
      svg.tickGenerator("tens", width, yDomain, yRange);
    } else if (range < 60) {
      svg.tickGenerator("fives", width, yDomain, yRange);
      svg.tickGenerator("tens", width, yDomain, yRange);
    } else {
      svg.tickGenerator("tens", width, yDomain, yRange);
    }
    if (range < 5000) {
    // tens and cents on every graph for non-volume
    svg.tickGenerator("tens", width, yDomain, yRange);
    svg.tickGenerator("cents", width, yDomain, yRange);
    }

});
}
// draw ticks and labels on y-axis
d3.selection.prototype.tickGenerator = function<T extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum>(this: d3.Selection<T, Datum, PElement, PDatum>, tickCall:"ones"|"fives"|"tens", width: number, yDomain: number[], yRange: number[]) {

  return this.each(function () {
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
        //svg.selectAll('text').remove();
        ones.forEach(tick => {
            svg.append("text")
                .attr("x", mobile_margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "12")
                .text(`${d3.format(",")(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);});

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
        //svg.fivesAxis.selectAll('text').remove();
        fives.forEach(tick => {
            svg.append("text")
                .attr("x", mobile_margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "12")
                .text(`${d3.format(",")(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);});

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
        //svg.tensAxis.selectAll('text').remove();
        tens.forEach(tick => {
            svg.append("text")
                .attr("x", mobile_margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "14")
                .text(`${d3.format(",")(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);});

      default:
        const cents = centTick(yDomain[0], yDomain[1]);
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
        //svg.centsAxis.selectAll('text').remove();
        cents.forEach(tick => {
            svg.append("text")
                .attr("x", mobile_margin.left + 6)
                .attr("y", y(tick))
                .attr("text-anchor", "left")
                .attr("fill", "#FF9151")
                .style("font-size", "16")
                .text(`${d3.format(",")(tick)}`) // Formatting tick value
                .attr("opacity", 0.3);});
    }
  });
}
// format and draw the company's ticker on graph background
d3.selection.prototype.backgroundTicker = function<T extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum>(this: d3.Selection<T, Datum, PElement, PDatum>, width: number, height: number, ticker: string) {

  return this.each(function () {
  const svg = d3.select(this as T);
    
    const mobile = width < 935 || height < 935 ? true: false

    svg.append("text")

    if (mobile) {

    // mobile/small desktop turned view
    if (width > height * 1.15 && width < 1499) {
      svg.attr("x", `${mobile_margin.right * 2.5}px`)
      svg.attr("y", `${0 + height*.93}px`)
      width > 750 ? svg.attr("font-size", `${height * .67}px`)
                  : svg.attr("font-size", `${height * .36}px`);
    } else 
    if (width > 1500) {
      svg.attr("x", `${mobile_margin.right * 2.5}px`)
      svg.attr("y", `${0 + height*.93}px`)
      svg.attr("font-size", `${height * .88}px`)
    }
    // mobile/small desktop vertical view
    else {
      svg.attr("font-size", `${height * .26}px`);
      height / width < 1.3 ? svg.attr("x", `${mobile_margin.right * 8}px`)
                                .attr("y", `${-2 * mobile_margin.top}px`)
                           : svg.attr("x", `${mobile_margin.right * 8}px`)
                                .attr("y", `${mobile_margin.right * 4}px`)
      height > 825 ? svg.attr("transform", "rotate(69)") 
                  : svg.attr("transform", "rotate(61)") 
    } 
    }
    else {
      svg.attr("x", `${mobile_margin.right * 2.5}px`)
      svg.attr("y", `${0 + height*.93}px`)
      svg.attr("font-size", `${height * .63}px`)
      svg.attr("opacity", 0.15)
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
    backgroundTicker(width: number, height: number, ticker: string): this;
   }
  interface Selection<GElement extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum> {
    yAxisGenerator(width: number, yDomain: number[], yRange: number[]): this;
   }
  interface Selection<GElement extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum> {
    tickGenerator(tickCall: string, width: number, yDomain: number[], yRange: number[]): this;
   }
}

export const yBuffered = (minPrice: number, maxPrice: number): [number, number] => {
  const range = maxPrice - minPrice;
  const bufferPercentage = 0.1;
  const bufferedMinPrice = minPrice - range * bufferPercentage;
  const bufferedMaxPrice = maxPrice + range * bufferPercentage;
  return [bufferedMinPrice, bufferedMaxPrice];
}

// x and y -axis tick array creation functions
export const centTick = (min: number, max: number): number[] => {
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
  const cents = centTick(min, max);
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
  const cents = centTick(min, max);
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

export const threeMonthsTick = (stringList: string[]): string[] => {
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

export const weekStartTick = (stringList: string[]): string[] => {
  const years = yearTick(stringList);
  const months = monthTick(stringList);
  const ticks: string[] = [];
  let lastWeekStart: Date | null = null;
  stringList.forEach(str => {
    const date = new Date(str);
    const weekStart = new Date(date);
    weekStart.setUTCDate(date.getUTCDate() - date.getUTCDay() + 1);
    if ((!lastWeekStart || weekStart > lastWeekStart) && !years.includes(str) && !months.includes(str)) {
      ticks.push(str);
      lastWeekStart = weekStart;
    }
  });
  return ticks;
};

export const dayTick = (stringList: string[]): string[] => {
  const months = monthTick(stringList);
  const weeks = weekStartTick(stringList);
  const ticks: string[] = [];
  let lastDay: Date | null = null;
  stringList.forEach(str => {
    const date = new Date(str);
    if ((!lastDay || date.getUTCDate() !== lastDay.getUTCDate()) && !months.includes(str) && !weeks.includes(str)) {
      ticks.push(str);
      lastDay = date;
    }
  });
  return ticks;
}; 

export const generateSvg =  (data: any, stock: Stock, height: number, width: number, viewHeight: number): string => {
        if (stock.value === "price") {
            const svg = priceSvg(data, height, width, stock.time, viewHeight);
            return svg;
        } else if (stock.value === "vol") {
            const svg = volSvg(data, height, width, stock.ticker, stock.time, viewHeight);
            return svg;
        } else if (stock.value === "sma") {
            const svg = smaSvg(data, height, width, stock.ticker, stock.time, viewHeight);
            return svg;
        } else {
            const svg = rsiSvg(data, height, width, stock.ticker, stock.time, viewHeight);
            return svg;
        }
}
