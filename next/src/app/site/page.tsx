"use client"
import { Chart } from "@components/chart";
import { CandleChart, CandleStickChartObs } from "@components/candlestick";
import DummyData from "./loader";

console.log("Importing dummy data");
const ddata = DummyData();
console.log(ddata.meta);
console.log(ddata.values.at(0)?.datetime.getUTCDay());
// console.log(ddata.values.slice(0,2));

export default function Home() {
  return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <CandleChart data={ddata.values} />
          <CandleChart data={ddata.values.slice(0,100)} />
          <Chart data={ddata.values.slice(0,10)}/>
          <Chart data={ddata.values}/>

        </main>
      );
}
