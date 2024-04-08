"use client"
import { Chart } from "@components/chart";
import { CandleChart, CandleStickChartObs } from "@components/candlestick_ts";
import {CandlestickChart, CandleStickChart_Obs} from "@components/candlestick";
import DummyData from "./loader";

let new_data = [
        {
            "datetime": "2024-03-22",
            "open": "171.75999",
            "high": "173.05000",
            "low": "170.06000",
            "close": "172.28000",
            "volume": "71106600"
        },
        {
            "datetime": "2024-03-21",
            "open": "177.05000",
            "high": "177.49001",
            "low": "170.84000",
            "close": "171.37000",
            "volume": "106181300"
        },
        {
            "datetime": "2024-03-20",
            "open": "175.72000",
            "high": "178.67000",
            "low": "175.09000",
            "close": "178.67000",
            "volume": "53423100"
        },
        {
            "datetime": "2024-03-19",
            "open": "174.34000",
            "high": "176.61000",
            "low": "173.03000",
            "close": "176.08000",
            "volume": "55215200"
        },];

// convert the datetime from string to Date
 let new_data_date = new_data;
new_data_date.forEach(item => {
    item.datetime = new Date(item.datetime) // typescript hates this but it works in this case
});

let data1 = new_data.slice(0,5);

//const stonk = JSON.parse(new_data);

console.log("Importing dummy data");
const ddata = DummyData();
console.log(ddata.meta);
console.log(ddata.values.at(0)?.datetime.getUTCDay());
// console.log(ddata.values.slice(0,2));

export default function Home() {
  return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          {/*
          <div>
          <Chart data={data_test}/>
          </div>
          <div>
          <CandlestickChart newData={new_data}/>
          </div>

          <div>
          <CandleChart newData={data1}/>
          </div>
          <CandleChart newData={ddata.values}/>
*/}

          <Chart data={ddata.values.slice(0,10)}/>
          <Chart data={ddata.values}/>

        </main>
      );
}
