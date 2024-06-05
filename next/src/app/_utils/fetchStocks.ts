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

async function fetchStocks(stockLocation: number, ticker: string, value: string, time: string, updateSvg: (index: number, timeframe: string, svg: string) => void) {
  if (value === "price") {
    if (time === "3m" || time === "6m" || time ===  "1y") {

      try {
        const response = await fetch(`http://3.140.61.213/api/${ticker}/1y`);
        const data = await processPriceResponse(response);

        // 3m
        const threeData = filterRecentData(data, 3);
        const threeMsvg = generateSvgGraph(threeData);
        updateSvg(stockLocation, "3m", threeMsvg);

        // 6m
        const sixData = filterRecentData(data, 6);
        const sixMsvg = generateSvgGraph(sixData);
        updateSvg(stockLocation, "6m", sixMsvg);

        // 1y
        const oneYsvg = generateSvgGraph(data);
        updateSvg(stockLocation, "1y", oneYsvg);

      } catch (error) {
        console.log("Error handling price for small range: ", error);
      }

    } else if (time === "3y" || time === "5y") {

      try {
        const response = await fetch(`http://3.140.61.213/api/${ticker}/5y`);
        const data = await processPriceResponse(response);

        // 3y
        const threeYData= filterRecentData(data, 36);
        const threeYsvg = generateSvgGraph(threeYData);
        updateSvg(stockLocation, "3y", threeYsvg);

        // 5y
        const fiveYsvg = generateSvgGraph(data);
        updateSvg(stockLocation, "5y", fiveYsvg);

      } catch (error) {
        console.log("Error handling price for large range: ", error);
      }
    }

  } else if (value === "vol") {
    if (time === "3m" || "6m" || "1y") {

      try {
        const response = await fetch(`http://3.140.61.213/api/${ticker}/${value}/1y`);
        const data = await processVRSResponse(response, value);

        // 3m
        const threeData = filterRecentData(data, 3);
        console.log(threeData)
        const threeMsvg = generateSvgGraph(threeData);
        updateSvg(stockLocation, "3m", threeMsvg);

        // 6m
        const sixData = filterRecentData(data, 6);
        const sixMsvg = generateSvgGraph(sixData);
        updateSvg(stockLocation, "6m", sixMsvg);

        // 1y
        const oneYsvg = generateSvgGraph(data);
        updateSvg(stockLocation, "1y", oneYsvg);

      } catch (error) {
          console.log("Error handling volume for small range: ", error);
      }
     
    } else {

      try {
        const response = await fetch(`http://3.140.61.213/api/${ticker}/${value}/5y`);
        const data = await processVRSResponse(response, value);

        // 3y
        const threeYData= filterRecentData(data, 36);
        const threeYsvg = generateSvgGraph(threeYData);
        updateSvg(stockLocation, "3y", threeYsvg);

        // 5y
        const fiveYsvg = generateSvgGraph(data);
        updateSvg(stockLocation, "5y", fiveYsvg);


      } catch (error) {
        console.log("Error handling volume for large range: ", error);
      }
    }

  } else if (value === "rsi") {
    if (time === "3m" || "6m" || "1y") {

      try {
        const response = await fetch(`http://3.140.61.213/api/${ticker}/${value}/1y`);
        const data = await processVRSResponse(response, value);

        // 3m
        const threeData = filterRecentData(data, 3);
        const threeMsvg = generateSvgGraph(threeData);
        updateSvg(stockLocation, "3m", threeMsvg);

        // 6m
        const sixData = filterRecentData(data, 6);
        const sixMsvg = generateSvgGraph(sixData);
        updateSvg(stockLocation, "6m", sixMsvg);

        // 1y
        const oneYsvg = generateSvgGraph(data);
        updateSvg(stockLocation, "1y", oneYsvg);

      } catch (error) {
        console.log("Error handling rsi for small range: ", error);
      }

    } else {

      try {
        const response = await fetch(`http://3.140.61.213/api/${ticker}/${value}/5y`);
        const data = await processVRSResponse(response, value);

        // 3y
        const threeYData= filterRecentData(data, 36);
        const threeYsvg = generateSvgGraph(threeYData);
        updateSvg(stockLocation, "3y", threeYsvg);

        // 5y
        const fiveYsvg = generateSvgGraph(data);
        updateSvg(stockLocation, "5y", fiveYsvg);

      } catch (error) {
        console.log("Error handling rsi for large range: ", error);
      }
    }

  } else if (value === "sma") {
    if (time === "3m" || "6m" || "1y") {

      try {
        const response = await fetch(`http://3.140.61.213/api/${ticker}/${value}/1y`);
        const data = await processVRSResponse(response, value);

        // 3m
        const threeData = filterRecentData(data, 3);
        const threeMsvg = generateSvgGraph(threeData);
        updateSvg(stockLocation, "3m", threeMsvg);

        // 6m
        const sixData = filterRecentData(data, 6);
        const sixMsvg = generateSvgGraph(sixData);
        updateSvg(stockLocation, "6m", sixMsvg);

        // 1y
        const oneYsvg = generateSvgGraph(data);
        updateSvg(stockLocation, "1y", oneYsvg);

      } catch (error) {
        console.log("Error handling sma for small range: ", error);
      }

    } else {

      try {
        const response = await fetch(`http://3.140.61.213/api/${ticker}/${value}/5y`);
        const data = await processVRSResponse(response, value);

        // 3y
        const threeYData= filterRecentData(data, 36);
        const threeYsvg = generateSvgGraph(threeYData);
        updateSvg(stockLocation, "3y", threeYsvg);

        // 5y
        const fiveYsvg = generateSvgGraph(data);
        updateSvg(stockLocation, "5y", fiveYsvg);

      } catch (error) {
        console.log("Error handling sma for large range: ", error);
      }
     
    }

  } else {
    console.log("Error parsing value: ", value)
  }
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
