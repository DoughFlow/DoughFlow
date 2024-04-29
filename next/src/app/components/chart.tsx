import * as d3 from "d3";
import { format } from "date-fns";
import { CSSProperties } from "react";


interface StockData {
datetime: Date;
open: number;
high: number;
low: number;
close: number;
}

export function Chart({ data }: { data: StockData[] }) {
    console.log("starting Marcus plot");
    let xScale = d3
        .scaleTime()
        .domain([data[0].datetime, data[data.length - 1].datetime])
        .range([0, 100]);

    let yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data.map((d) => d.open)) ?? 0])
        .range([100, 0]);

    let line = d3
        .line<(typeof data)[number]>()
        .x((d) => xScale(d.datetime))
        .y((d) => yScale(d.open));

    let d = line(data);

    if (!d) {
        console.log("no data!!!!!!!!\n");
        return null;
    }
    return (
            <div
            className="flex flex-col md:flex-row items-center justify-center"
            >

            {/* Y axis */}
            <div className="order-1 md:order-none">
            <svg
            >
            <g>
            {yScale
            .ticks(8)
            .map(yScale.tickFormat(8, "d"))
            .map((value, i) => (
                        <text
                        key={i}
                        y={`${yScale(+value)}%`}
                        alignmentBaseline="middle"
                        textAnchor="start" // was end, that made it dis
                        className="text-blue"
                        fill="currentColor"
                        >
                        {value}
                        </text>
                        ))}
    </g>
        </svg>
        </div>


        <div className="order-2 md:order-none md:order-3 mt-4 md:ml-0">
        {/* Chart area */}
    <svg
        >
        <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        >
        {/* Grid lines */}
    {yScale
        .ticks(8)
            .map(yScale.tickFormat(8, "d"))
            .map((active, i) => (
                        <g
                        transform={`translate(0,${yScale(+active)})`}
                        className="text-gray-700"
                        key={i}
                        >
                        <line
                        x1={0}
                        x2={100}
                        stroke="currentColor"
                        strokeDasharray="6,5"
                        strokeWidth={0.5}
                        vectorEffect="non-scaling-stroke"
                        />
                        </g>
                        ))}

        {/* Line */}
        <path
            d={d}
        fill="none"
            className="text-gray-600"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            />

            {/* Data Points */}
        {data.map((d) => (
                    <path
                    key={d.datetime.toString()}
                    d={`M ${xScale(d.datetime)} ${yScale(d.open)} l 0.0001 0`}
                    vectorEffect="non-scaling-stroke"
                    strokeWidth="8"
                    strokeLinecap="square"
                    fill="none"
                    stroke="currentColor"
                    className="text-gray-400"
                    />
                    ))}
        </svg>
            </svg>

            </div>

            {/* X axis */}
            <div className="order-3 md:order-none md:order-2 mt-4 md:mt-0">
        <svg
            >
            {data.map((day, i) => (
                        <g key={i} className="overflow-visible font-medium text-gray-500">
                        <text
                        x={`${xScale(day.datetime)}%`}
                        y="100%"
                        textAnchor={'center'}
                        /*{
                          i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"
                          }*/
                        fill="currentColor"
                        className="@sm:inline hidden text-sm"
                        >
                        {format(day.datetime, "EEE")}
                        </text>
                        {/*
                            <text
                            x={`${xScale(day.datetime)}%`}
                            y="100%"
                            textAnchor={
                            i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"
                            }
                            fill="currentColor"
                            className="@sm:hidden text-xs"
                            >
                            {format(day.datetime, "EEEEE")}
                            </text>
                            */}
            </g>
                ))}
        </svg>
            </div>

            </div>
            );
}

