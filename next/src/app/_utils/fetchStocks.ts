// fetchStocks 
// takes in ticker value time returns function calls to the generateSvgs stuff
//
// generateSvgs
// will take in the data and a time frame 3m 6m 1y 3y 5y
// the data will be cut into the correct stuff for the time frame 
import * as d3 from 'd3';

interface PriceDataPoint {
  timestamp: string;
  ticker: string;
  open_price: number;
  high_price: number;
  low_price: number;
  close_price: number;
  volume?: number;
}

interface IndicatorDataPoint {
  timestamp: string;
  [key: string]: number | string;
}

type DataPoint = PriceDataPoint | IndicatorDataPoint;

function filterRecentData(data: DataPoint[], months: number): DataPoint[] {
  if (data.length === 0) return [];
  const lastDataPointDate = new Date(data[data.length - 1].timestamp);
  const cutoffDate = new Date(lastDataPointDate);
  cutoffDate.setMonth(lastDataPointDate.getMonth() - months);
  return data.filter(dp => new Date(dp.timestamp) >= cutoffDate);
}

async function processPriceResponse (response: Response): Promise<DataPoint[]> {
  if (!response.ok) throw new Error('Network response was not ok');
  const jsonData = await response.json();
  const data: DataPoint[] = jsonData.map((dp: any) => ({
    timestamp: dp.timestamp,
    open_price: dp.open_price,
    high_price: dp.high_price,
    low_price: dp.low_price,
    close_price: dp.close_price,
  }));
  console.log(data)
  return data;
}

async function processVRSResponse (response: Response, value: string): Promise<DataPoint[]> {
  if (!response.ok) throw new Error('Network response was not ok');
  const jsonData = await response.json();
  let data: IndicatorDataPoint[] = [];
  switch (value) {
    case "vol": {
      data = jsonData.map((dp: any) => ({
        timestamp: dp.timestamp,
        volume: dp.volume,
      }));
      break;
    }
    case "sma": {
      data = jsonData.map((dp: any) => ({
        timestamp: dp.timestamp,
        sma: dp.sma,
      }));
      break;
    }
    case "rsi": {
      data = jsonData.map((dp: any) => ({
        timestamp: dp.timestamp,
        rsi: dp.rsi,
      }));
      break;
    }
  }

  return data;
}

async function fetchStocks(ticker: string, value: string, time: string, updateSvg: (index: number, timeframe: string, svg: string) => void) {
  if (value === "price") {
    if (time === "3m" || "6m" || "1y") {

      try {
        const response = await fetch(`http://3.140.61.213/api/${ticker}/1y`);
        const data = await processPriceResponse(response)
        const newData = filterRecentData(data, 3)
        const threeMsvg = generateSvgGraph(newData);
        updateSvg(0, time, threeMsvg);
        const sixMonthData = data;
        const oneYearData = data;
      } catch (error) {
        console.log("Error handling price for small range: ", error);
      }

    } else {

      try {
        const response = await fetch(`http://3.140.61.213/api/${ticker}/1y`);
      } catch (error) {
        console.log("Error handling price for large range: ", error);
      }
    }

  } else if (value === "volume") {
    if (time === "3m" || "6m" || "1y") {

      try {
        const response = await fetch(`http://3.140.61.213/api/${ticker}/1y`);
      } catch (error) {
          console.log("Error handling volume for small range: ", error);
      }
     
    } else {

      try {
        const response = await fetch(`http://3.140.61.213/api/${ticker}/1y`);
      } catch (error) {
        console.log("Error handling volume for large range: ", error);
      }
    }

  } else if (value === "rsi") {
    if (time === "3m" || "6m" || "1y") {

      try {
        const response = await fetch(`http://3.140.61.213/api/${ticker}/1y`);
      } catch (error) {
        console.log("Error handling rsi for small range: ", error);
      }

    } else {

      try {
        const response = await fetch(`http://3.140.61.213/api/${ticker}/1y`);
      } catch (error) {
        console.log("Error handling rsi for large range: ", error);
      }
    }

  } else if (value === "sma") {
    if (time === "3m" || "6m" || "1y") {

      try {
        const response = await fetch(`http://3.140.61.213/api/${ticker}/1y`);
      } catch (error) {
        console.log("Error handling sma for small range: ", error);
      }

    } else {

      try {
        const response = await fetch(`http://3.140.61.213/api/${ticker}/1y`);
      } catch (error) {
        console.log("Error handling sma for large range: ", error);
      }
     
    }

  } else {
    console.log("Error parsing value: ", value)
  }
  // try {
  //   const response = await fetch(`http://3.140.61.213/api/${ticker}/${time}`);
  //   if (!response.ok) throw new Error('Network response was not ok');
  //   const jsonData = await response.json();
  //   const data: DataPoint[] = jsonData.map((dp: any) => ({
  //     timestamp: dp.timestamp,
  //     open_price: dp.open_price,
  //     high_price: dp.high_price,
  //     low_price: dp.low_price,
  //     close_price: dp.close_price,
  //     volume: dp.volume
  //   }));
  //   const svg = generateSvgGraph(data); // Ensure generateSvgGraph is also moved or accessible here
  //   updateSvg(0, "6m", svg); // Pass updateSvg as a callback
  //   console.log(svg);
  // } catch (error) {
  //   console.error('Failed to fetch or process data:', error);
  // }
}

const generateSvgGraph = (data: DataPoint[]): string => {
  if (data.length === 0) return '';

  const svgWidth = 600;
  const svgHeight = 300;
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };

  // Manual parsing and scaling
  const parseDate = (dateStr: string): number => new Date(dateStr).getTime();
  const timestamps = data.map(dp => parseDate(dp.timestamp));
  const closePrices = data.map(dp => dp.close_price);
  const xMin = Math.min(...timestamps);
  const xMax = Math.max(...timestamps);
  const yMin = Math.min(...closePrices);
  const yMax = Math.max(...closePrices);

  const xScale = (x: number) => ((x - xMin) / (xMax - xMin)) * (svgWidth - margin.left - margin.right) + margin.left;
  const yScale = (y: number) => svgHeight - margin.bottom - ((y - yMin) / (yMax - yMin)) * (svgHeight - margin.top - margin.bottom);

  // Create SVG with D3
  const svg = d3.create("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("xmlns", "http://www.w3.org/2000/svg");

  svg.append("rect") // Background
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "white");

  // Generate path data manually
  let pathD = "M" + xScale(timestamps[0]) + " " + yScale(closePrices[0]);
  timestamps.forEach((timestamp, index) => {
    pathD += " L" + xScale(timestamp) + " " + yScale(closePrices[index]);
  });

  svg.append("path") // Add the path with D3
    .attr("d", pathD)
    .attr("stroke", "steelblue")
    .attr("fill", "none")
    .attr("stroke-width", 2);

  const svgNode = svg.node();
  if (svgNode === null) {
    console.error("Failed to create SVG node");
    return '';
  }

  return svgNode.outerHTML;
};



export { fetchStocks, generateSvgGraph };
