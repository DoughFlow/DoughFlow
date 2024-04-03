import React, { useEffect, useRef} from 'react';
import * as d3 from 'd3';

// https://medium.com/@suryanksingh/candle-stick-with-d3-js-023ae0831bc6
/* other potential sources:
    *
    * https://gist.github.com/abeppu/1074045
    * https://codepen.io/jazon3008/pen/zgGjqN
    * https://observablehq.com/@d3/candlestick-chart
    * */
const CandlestickChart = ({newData}) => {
  const data = Object.values(newData)
   // data.sort((a, b) => b.datetime.getTime() - a.datetime.getTime());
  //console.log(data.slice(0,2));
  const svgRef = useRef(null);

  useEffect(() => {

    if(!data || data.length === 0) return;

    d3.select(svgRef.current).selectAll('svg').remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = (data.length * 75)
    //const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;


    const svg = d3.select(svgRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height + margin.top + margin.bottom);    

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
              .range([0,width])

    const y = d3.scaleLinear()
              .range([height, 0])
    
    const xScale = d3.scaleBand()
                      .range([0, width])
                      .domain(data.map((d) => d.datetime));

    const yScale = d3.scaleLinear()
                      .range([height, 0])
                      .domain([d3.min(data, (d) => d.low), d3.max(data, (d) => d.high)]);
    
    
    g.selectAll('.candle')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'candle')
      .attr('x', d => xScale(d.datetime))
      .attr('y', d => yScale(Math.max(d.open, d.close)))
      .attr('width', "20px")
      .attr('height', d => Math.abs(yScale(d.open) - yScale(d.close)))
      .attr('fill', d => (d.close >= d.open ? 'green' : 'red'));

    g.selectAll(".wick")
      .data(data)
      .enter()
      .append("rect")
      .attr('class', 'wick')
      .attr('x', d => (xScale(d.datetime) + 10))
      .attr("y", d => yScale(d.high))
      .attr('width', '1px')
      .attr("height", d => (yScale(d.low) - yScale(d.high)))
      .attr('fill', d => (d.close >= d.open ? 'green' : 'red'))



    const xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(10);
    const yAxis = d3.axisLeft(yScale).tickSize(0).tickPadding(10);


    g.append('g').attr('transform', `translate(0,${height})`)
      .call(xAxis
        .ticks(d3.timeMonth.every(6))
        .tickFormat(d3.timeFormat("%Y-%m-%d")))
      .attr('dx', '10em')
      .style('display', 'flex')
      .style('text-anchor', 'center')
      .style('font-size', '12px')
      .style('margin', '20px')
      .attr('overflow', 'scroll')
      .style('color', 'black');
    
    g.append('g')
    .call(yAxis)
    .style('color', 'black');

    g.selectAll('xGrid')
    .data(x.ticks().slice(1))
    .join('line')
    .attr('x1', d => x(d))
    .attr('x2', d => x(d))
    .attr('y1', 0)
    .attr('y2', height)
    .attr('stroke', "red")
    .attr('stroke-width', .5);
    
    g.selectAll('yGrid')
    .data(y.ticks().slice(1))
    .join('line')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', d => y(d))
    .attr('y2', d => y(d))
    .attr('stroke', "green")
    .attr('stroke-width', .5);

  }, [data]);

  return (
        <div ref={svgRef} style={{width:'auto' , overflowX:'scroll'}} ></div>
  );
};

export default CandlestickChart;

/*
 * CandleStick from observables*/
const CandleStickChart_Obs = ({data}) => {
    console.log(data.slice(0,2));
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width  = 928;
    const height = 600;

    //trying to make this a react element
    const svgRef = useRef(null);

    useEffect(() => {
    d3.select(svgRef.current).selectAll('svg').remove();
    
    // declare positional encodings
    const x = d3.scaleBand()
        .domain(d3.utcDay
                .range(data.at(0)?.datetime, +data.at(-1).datetime + 1)
                .filter(d => d.getUTCDay() !== 0 && d.getUTCDay() !== 6))
        .range([margin.left, width-margin.right]).padding(0.2);

    const y = d3.scaleLog()
        .domain([d3.min(data, d => d.low), d3.max(data, d => d.high)])
        .rangeRound([height - margin.bottom, margin.top]);

    // create SVG Containter
    // const svg = d3.create("svg")
    const svg = d3.select(svgRef.current)
        .append('svg')
        .attr("viewBox", [0, 0, width, height]);

    // append the axes
    svg.append("g")
        .attr("transform",`translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x)
                .tickValues(d3.utcMonday
                    .every(width > 720 ? 1:2)
                    .range(data.at(0).datetime, data.at(-1).datetime))
                .tickFormat(d3.utcFormat("%-m/%-d")))
        .call(g => g.select(".domain").remove());

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y)
                .tickFormat(d3.format("$~f"))
                .tickValues(d3.scaleLinear().domain(y.domain()).ticks()))
        .call(g => g.selectAll(".tick line").clone()
                .attr("stroke-opacity", 0.2)
                .attr("x2", width - margin.left - margin.right))
        .call(g => g.select(".domain").remove());

    // create a group for each day of data, and append two lines to it
    const g = svg.append("g")
        .attr("stroke-linecap", "round")
        .attr("stroke", "black")
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(${x(d.datetime)},0)`);

    g.append("line")
        .attr("y1", d => y(d.low))
        .attr("y2", d => y(d.high));

    g.append("line")
        .attr("y1", d => y(d.open))
        .attr("y2", d => y(d.close))
        .attr("stroke-width", x.bandwidth())
        .attr("stroke", d => d.open > d.close ? d3.schemeSet1[0]
                : d.close > d.open ? d3.schemeSet1[2]
                : d3.schemeSet1[8]);

    // append a title (tooltip)
    const formatDate = d3.utcFormat("%B %-d, %Y");
    const formatValue = d3.format(".2f");
    const formatChange = ((f) => (y0, y1) => f((y1 - y0) / y0))(d3.format("+.2%"));

    g.append("title")
        .text(d => `${formatDate(d.datetime)}
Open: ${formatValue(d.open)}
Close: ${formatValue(d.close)} (${formatChange(d.open, d.close)})
Low: ${formatValue(d.low)}
High: ${formatValue(d.high)}`);
}, [data]);

    return (
    <div ref={svgRef} style={{width: 'auto', overflowX:'scroll'}}></div>)
};

export { CandlestickChart, CandleStickChart_Obs };

