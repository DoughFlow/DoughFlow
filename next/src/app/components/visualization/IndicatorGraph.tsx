import React, { useEffect, useRef, useState } from "react";
import IndicatorData from "@components/visualization/IndicatorData";
import * as d3 from "d3";

interface IndicatorGraphData {
  timestamp: string;
  [key: string]: number | string;
}

interface IndicatorGraphProps {
  data: IndicatorGraphData[];
}

//const IndicatorGraph = ({ticker, indicator}: {ticker: string, indicator: string}) => {
const IndicatorGraph = ({ ticker, date, indicator, height, width}:
    { ticker: string, date: string, indicator: string, height: number, width: number }) => {
  const [data, setData] = useState<IndicatorDataPoint[]>([])
  //const [indicator, setIndicator] = useState<string>("rsi");
  const svgRef = useRef(null);

  useEffect(() => {
    IndicatorData(ticker, date, indicator).then((result) => {
      setData(result);
    });
  }, [ticker, date, indicator]);

  useEffect(() => {
    console.log("beginning indicator plot");
    console.log(data.slice(0, 3));

    if (data.length === 0) return;

    d3.select(svgRef.current).selectAll("svg").remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    //const width = data.length * 12;
    //const width = 700;
    //const width = svgRef.current.clientWidth - margin.left - margin.right;
    //const height = 250 - margin.top - margin.bottom;

    // Helper function for tooltip position
    const tooltipHelper = (x: number, y: number): [number, number] => {
      // Adjust tooltip position if it exceeds screen boundaries
      let adjustedX = x + 10;
      let adjustedY = y + 10;

      if (adjustedY + 150 > height) {
        adjustedY = height - 150;
      }
      switch (true) {
        case adjustedX + 300 > window.innerWidth:
          adjustedX = window.innerWidth - 300;
          break;
        case adjustedX + 250 > width:
          adjustedX = width - 250;
          break;
      }
      return [adjustedX, adjustedY];
    };

    // Begin plot stuff
    const parent = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height + margin.top + margin.bottom);

    // holds y axis
    const y_axis_svg = parent
      .append("svg")
      .attr("height", height + margin.top + margin.bottom)
      //.attr('width','')
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("z-index",'-1');

    // body holds the plot with x axis
    const body = parent.append("div").style("overflow-x", "auto");

    // svg is the x axis and plot
    const svg = body
      .append("svg")
      .attr("width", width)
      .attr("height", height + margin.top + margin.bottom);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    //const x = d3.scaleBand().range([0, width])
    //.domain(data.map((d) => d.timestamp));

    const y = d3.scaleLinear().range([height, 0]);

    // xScale
    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.timestamp));

    const yData = indicatorDataParse(data, indicator);

    // yScale
    const ymin = Math.min(...yData);
    const ymax = Math.max(...yData);
    console.log(ymin);
    console.log(ymax);

    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([ymin / 2, ymax]);

    const tooltip = g
      .append("text")
      .attr("class", "tooltip")
      .attr("fill", "white")
      .style("pointer-events", "none");

    g.selectAll(".xBar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "xBar")
      .attr("x", (d) => xScale(d.timestamp)!)
      .attr("y", 0)
      .attr("width", "12px")
      .attr("height", height)
      //.style("fill", "dfgrey")
      .on("mouseover", (evt, d) => {
        const [mx, my] = d3.pointer(evt);

        let tooltipText = tooltipTextHelper(d, indicator);

        //const tooltipPosition = tooltipHelper(mx, my);

        tooltip
          .attr(
            "transform",
            //`translate(${tooltipPosition[0]}, ${tooltipPosition[1]})`,
            `translate(0, 0)`,
          )
          .selectAll("tspan")
          .data(tooltipText.split("\n"))
          .join("tspan")
          .attr("dy", "1.5em") // spacing between the lines
          .attr("x", "20px") // Space to the right of the cursor
          .text((text) => text);
      })
      .on("mouseout", () => tooltip.selectAll("tspan").remove());

    // main line or bar graph
    if (indicator === "rsi") {
      // line graph
      console.log("rsi");
      const line = d3
        .line<IndicatorDataPoint>()
        .x((d) => xScale(d.timestamp)!)
        .y((d) => yScale(d.rsi!));

      g.append("path")
        .datum(data)
        .attr("class", "line")
        .style("stroke", "#996F4F")
        .style("stroke-width", "3px")
        .attr("d", line)
        .on("mouseover", (evt) => {
          const [mx, my] = d3.pointer(evt);

          // Find the nearest data point
          const bisect = d3.bisector(
            (d: IndicatorDataPoint) => d.timestamp,
          ).left;
          const invertedCoord = invertBand(xScale, mx);
          const index = bisect(data, invertedCoord);
          const nearestDataPoint = data[index];

          let tooltipText = tooltipTextHelper(nearestDataPoint, indicator);

          //const tooltipPosition = tooltipHelper(mx, my);

          tooltip
            .attr(
              "transform",
              //`translate(${tooltipPosition[0]}, ${tooltipPosition[1]})`,
              `translate(0, 0)`,
            )
            .selectAll("tspan")
            .data(tooltipText.split("\n"))
            .join("tspan")
            .attr("dy", "1.5em") // spacing between the lines
            .attr("x", "20px") // Space to the right of the cursor
            .text((text) => text);
        })
        .on("mouseout", () => tooltip.selectAll("tspan").remove());
    } else {
      // bar graph
      g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => xScale(d.timestamp)!)
        .attr("y", (d, i) => yScale(yData[i])) // won't work for general indicator
        .attr("width", "12px")
        .attr("height", (d, i) => height - yScale(yData[i])) // won't work for general indicator
        .style("stroke", "#996F4F") // can't get the stroke to work in the classed call
        .style("stroke-width", "2px")
        .classed("fill-dfyellow", true)
        .on("mouseover", (evt, d) => {
          const [mx, my] = d3.pointer(evt);
          let tooltipText = tooltipTextHelper(d, indicator);

          //const tooltipPosition = tooltipHelper(mx, my);

          tooltip
            .attr(
              "transform",
              //`translate(${tooltipPosition[0]}, ${tooltipPosition[1]})`,
              `translate(0, 0)`,
            )
            .selectAll("tspan")
            .data(tooltipText.split("\n"))
            .join("tspan")
            .attr("dy", "1.5em") // spacing between the lines
            .attr("x", "20px") // Space to the right of the cursor
            .text((text) => text);
        })
        .on("mouseout", () => tooltip.selectAll("tspan").remove());
    }
    //
    const yAxis = d3
      .axisLeft(yScale)
      .tickSize(0)
      .tickPadding(10)
      .tickFormat(d3.format(".2s"));

    y_axis_svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`) // Translate the y-axis group to adjust for margins;
      .call(yAxis)
      .attr("text-anchor", "end");

    // tooltip needs to be on top of the other graph elements
    tooltip.raise();
  }, [data]);

  const indicatorDataParse = (
    data: IndicatorDataPoint[],
    indicator: string,
  ): number[] => {
    let returnParse: number[] = [];
    switch (indicator) {
      case "vol": {
        returnParse = data.map((d) => d.volume!);
        break;
      }
      case "sma": {
        returnParse = data.map((d) => d.sma!);
        break;
      }
      case "rsi": {
        returnParse = data.map((d) => d.rsi!);
        break;
      }
    }
    return returnParse;
  };

  const tooltipTextHelper = (
    d: IndicatorDataPoint,
    indicator: string,
  ): string => {
    let returnParse = "";
    switch (indicator) {
      case "vol": {
        returnParse = `Date: ${d.timestamp}\nVolume: ${d.volume}`;
        break;
      }
      case "sma": {
        returnParse = `Date: ${d.timestamp}\nSMA: ${d.sma}`;
        break;
      }
      case "rsi": {
        returnParse = `Date: ${d.timestamp}\nRSI: ${d.rsi}`;
        break;
      }
    }
    return returnParse;
  };

  // helper function for line graph tooltip
  function invertBand(scale: d3.ScaleBand<string>, value: number): string {
    const domain = scale.domain();
    const step = scale.step();
    const firstVisibleBand = Math.abs(scale.range()[0]) / step;
    const index = Math.floor(value / step + firstVisibleBand);
    return domain[Math.max(0, Math.min(index, domain.length - 1))];
  }

  return <div ref={svgRef} className="z-0"></div>;
};

export default IndicatorGraph;
