"use server"
import { DataPoint } from "@/_utils/fetchData";
import * as d3 from "d3";

export const candlestickSVG = (data: DataPoint[], height: number, width:number) => {
  
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
  
  svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "white")

  const svgNode = svg.node();

  if (svgNode === null) {
    console.error("Failed to create SVG node");
    return '';
  }

  return (svgNode.outerHTML);

}

export const lineSVG = (data: DataPoint[], height: number, width:number) => {

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
  
  svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "white")

  const svgNode = svg.node();

  if (svgNode === null) {
    console.error("Failed to create SVG node");
    return '';
  }

  return (svgNode.outerHTML);

}

export const barSVG = (data: DataPoint[], height: number, width:number) => {
  
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
  
  svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "white")

  const svgNode = svg.node();

  if (svgNode === null) {
    console.error("Failed to create SVG node");
    return '';
  }

  return (svgNode.outerHTML);

}

