import { PriceDataPoint, volDataPoint, smaDataPoint, rsiDataPoint } from "@/_utils/fetchData";
import * as d3 from "d3";

const generateYTickMarks = (min: number, max: number): {tens: number[], fives: number[], ones: number[]} => {
    const range = max - min;
    const tens = [];
    const fives = [];
    const ones = [];
    let startTen = Math.ceil(min / 10) * 10;
    let startFive = Math.ceil(min / 5) * 5;
    let startOne = Math.ceil(min);
    for (let i = startTen; i <= max; i += 10) {
        tens.push(i);
    }
    if (range < 40 || range >= 40) {  // Adjust this condition based on your specific needs
        for (let i = startFive; i <= max; i += 5) {
            if (i % 10 !== 0) { // Avoid duplicating multiples of 10
                fives.push(i);
            }
        }
    }
    if (range < 40) {
        for (let i = startOne; i <= max; i++) {
            if (i % 5 !== 0 && i % 10 !== 0) { // Avoid duplicating multiples of 5 and 10
                ones.push(i);
            }
        }
    }
    return { tens, fives, ones };
};

export const smCandleSVG =  (data: PriceDataPoint[], height: number, width: number) => {

};

export const mdCandleSVG =  (data: PriceDataPoint[], height: number, width: number) => {
  const { 
    scaleBand,
    axisBottom,
    utcMonday,
    utcMonth,
    utcFormat,
    format
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
  const svg = d3.create("svg")
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
    .attr("stroke", "yellow");
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
    .attr("stroke", "white");
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
    .attr("stroke", "purple");
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
    .attr("stroke", "yellow");
  xAxis.selectAll('text').remove();
  const mondayAxis = svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(axisBottom(x).tickValues(weekStartTicks).tickFormat(() => "").tickSize((-height) + (2 * margin.bottom)))
    .call(g => g.select(".domain").remove())
    .attr("opacity", 0.2)
    .selectAll(".tick line")
    .attr("stroke", "orange");
  mondayAxis.selectAll('text').remove();
  monthLabels.forEach(tick => {
    const tickDate = new Date(tick);
    const label = formatMonth(tickDate);
    svg.append("text")
      .attr("x", x(tick)! + 4)
      .attr("y", height - margin.bottom)
      .attr("text-anchor", "left")
      .attr("fill", "yellow") // can fill with hex #000000
      .style("font-size", "40")
      .text(label.toUpperCase())
      .attr("opacity", 0.6);
  });
  tens.forEach(tick => {
    svg.append("text")
      .attr("x", margin.left + 6)
      .attr("y", y(tick))
      .attr("text-anchor", "left")
      .attr("fill", "yellow")
      .style("font-size", "12")
      .text(`${format(",")(tick)}`) // Formatting tick value
      .attr("opacity", 0.3);
  });

  fives.forEach(tick => {
    svg.append("text")
      .attr("x", margin.left + 6)
      .attr("y", y(tick))
      .attr("text-anchor", "left")
      .attr("fill", "white")
      .style("font-size", "12")
      .text(`${format(",")(tick)}`) // Formatting tick value
      .attr("opacity", 0.3);
  });

  ones.forEach(tick => {
    svg.append("text")
      .attr("x", margin.left + 6)
      .attr("y", y(tick))
      .attr("text-anchor", "left")
      .attr("fill", "purple")
      .style("font-size", "12")
      .text(`${format(",")(tick)}`) // Formatting tick value
      .attr("opacity", 0.3);
  });

  svg.append("text")
      .attr("x", margin.left)
      .attr("y", height - margin.bottom)
      .attr("text-anchor", "center")
      .attr("fill", "white")
      .style("font-size", "20em")
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

export const lgCandleSVG =  (data: PriceDataPoint[], height: number, width: number) => {

};

export const smVolSVG =  (data: volDataPoint[], height: number, width: number) => {

};

export const mdVolSVG =  (data: volDataPoint[], height: number, width: number) => {

};

export const lgVolSVG =  (data: volDataPoint[], height: number, width: number) => {

};

export const smRsiSVG =  (data: rsiDataPoint[], height: number, width: number) => {

};

export const mdRsiSVG =  (data: rsiDataPoint[], height: number, width: number) => {

};

export const lgRsiSVG =  (data: rsiDataPoint[], height: number, width: number) => {

};

export const smSmaSVG =  (data: smaDataPoint[], height: number, width: number) => {

};

export const mdSmaSVG =  (data: smaDataPoint[], height: number, width: number) => {

};

export const lgSmaSVG =  (data: smaDataPoint[], height: number, width: number) => {

};







// add one month and middle and 2 year options
export const candlestickSVG = (data: PriceDataPoint[], height: number, width:number) => {
  const { 
    scaleBand,
    axisBottom,
    utcMonday,
    utcMonth,
    utcFormat
  } = d3;
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
  const mondayValues = (): string[] => {
    const ticks: string[] = [];
    let lastMonth: Date | null = null;
    stringList.forEach(str => {
      const date = new Date(str);
      if (date.getDay() === 1) {
        ticks.push(str);
      }
    })
    return ticks;
  };
  const monthTicks = monthValues().slice(0, -1); // remove the last one for the text but keep it for the tick marks
  const mondayTicks = mondayValues();
  const jointTicks = monthTicks.concat(mondayTicks);
  const margin = {top: 20, right: 40, bottom: 30, left: 20};
  const candleWidth = width / (data.length * 1.75);
  const candleOffset = candleWidth / 2;
  const yDomain = [
    Math.min(...data.map(d => +d.low_price)),
    Math.max(...data.map(d => +d.high_price))
  ];
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "transparent")
    .style("border", "1px solid white")
  const y = d3.scaleLinear()
    .range([height, 0])
    .domain(yDomain);
  const x = scaleBand()
    .domain(stringList)
    .range([margin.left, width - margin.right]);
  const xAxis = svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(axisBottom(x).tickValues(monthTicks).tickSize((-height) + (2 * margin.bottom)))
    .call(g => g.select(".domain").remove())
    .attr("opacity", 0.3);
  xAxis.selectAll('text').remove();
  monthTicks.forEach(tick => {
    const tickDate = new Date(tick);
    const label = formatMonth(tickDate);
    svg.append("text")
      .attr("x", x(tick)! + 2)
      .attr("y", height - margin.bottom)
      .attr("text-anchor", "left")
      .attr("fill", "white")
      .style("font-size", "20")
      .text(label)
      .attr("opacity", 0.6);
  });
  
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
}

export const volSVG = (data: volDataPoint[], height: number, width: number) => {
  const barWidth = width / (data.length * 1.75);
  const yDomain = [
    0,
    Math.max(...data.map(d => +d.vol))
  ];
  const xScale = d3.scalePoint<Date>()
    .range([0, width])
    .domain(data.map(d => new Date(d.timestamp)))
    .padding(0.2);
  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain(yDomain);
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "transparent")
    .style("border", "1px solid white")
  svg.selectAll("rect.bar")
    .data(data)
    .enter().append("rect")
    .classed("bar", true)
    .attr("x", d => xScale(new Date(d.timestamp)) ?? 0)
    .attr("y", d => yScale(+d.vol))
    .attr("width", barWidth)
    .attr("height", d => height - yScale(+d.vol))
    .attr("fill", "white");
  const svgNode = svg.node();
  if (svgNode === null) {
    console.error("Failed to create SVG node");
    return '';
  }
  return (svgNode.outerHTML);
};

export const smaSVG = (data: smaDataPoint[], height: number, width: number) => {
  const yDomain = [
    Math.min(...data.map(d => +d.sma)),
    Math.max(...data.map(d => +d.sma))
  ];
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "transparent")
    .style("border", "1px solid white")
  const xScale = d3.scalePoint<Date>()
    .range([0, width])
    .domain(data.map(d => new Date(d.timestamp)))
    .padding(0.5);
  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain(yDomain);
  const line = d3.line<smaDataPoint>()
    .x(d => xScale(new Date(d.timestamp)) ?? 0)
    .y(d => yScale(+d.sma) ?? 0);
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("d", line);
  const svgNode = svg.node();
  if (svgNode === null) {
    console.error("Failed to create SVG node");
    return '';
  }
  return (svgNode.outerHTML);
};

export const rsiSVG = (data: rsiDataPoint[], height: number, width: number) => {
  const yDomain = [
    Math.min(...data.map(d => +d.rsi)),
    Math.max(...data.map(d => +d.rsi))
  ];
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "transparent")
    .style("border", "1px solid white")
  const xScale = d3.scalePoint<Date>()
    .range([0, width])
    .domain(data.map(d => new Date(d.timestamp)))
    .padding(0.5);
  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain(yDomain);
  const line = d3.line<rsiDataPoint>()
    .x(d => xScale(new Date(d.timestamp)) ?? 0)
    .y(d => yScale(+d.rsi) ?? 0);
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("d", line);
  const svgNode = svg.node();
  if (svgNode === null) {
    console.error("Failed to create SVG node");
    return '';
  }
  return (svgNode.outerHTML);
};

