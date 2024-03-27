"use client"
import { Chart } from "@components/chart";
import CandlestickChart from "@components/candlestick";

let data_test = [
        { value: 10, date: new Date("2024-03-26") },
        { value: 20, date: new Date("2024-03-27") },
        { value: 15, date: new Date("2024-03-28") },
        { value: 25, date: new Date("2024-03-29") },
        { value: 18, date: new Date("2024-03-30") },
        { value: 22, date: new Date("2024-03-31") },
        { value: 30, date: new Date("2024-04-01") },
        { value: 17, date: new Date("2024-04-02") },
        { value: 29, date: new Date("2024-04-03") },
        { value: 35, date: new Date("2024-04-04") },
        // Add more data items as needed
    ];

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
        },
        {
            "datetime": "2024-03-18",
            "open": "175.57001",
            "high": "177.71001",
            "low": "173.52000",
            "close": "173.72000",
            "volume": "75604200"
        },
        {
            "datetime": "2024-03-15",
            "open": "171.17000",
            "high": "172.62000",
            "low": "170.28999",
            "close": "172.62000",
            "volume": "121664700"
        },
        {
            "datetime": "2024-03-14",
            "open": "172.91000",
            "high": "174.31000",
            "low": "172.05000",
            "close": "173.00000",
            "volume": "72913500"
        },
        {
            "datetime": "2024-03-13",
            "open": "172.77000",
            "high": "173.19000",
            "low": "170.75999",
            "close": "171.13000",
            "volume": "52488700"
        },
        {
            "datetime": "2024-03-12",
            "open": "173.14999",
            "high": "174.03000",
            "low": "171.00999",
            "close": "173.23000",
            "volume": "59825400"
        },
        {
            "datetime": "2024-03-11",
            "open": "172.94000",
            "high": "174.38000",
            "low": "172.05000",
            "close": "172.75000",
            "volume": "60139500"
        },
        {
            "datetime": "2024-03-08",
            "open": "169.00000",
            "high": "173.70000",
            "low": "168.94000",
            "close": "170.73000",
            "volume": "76114600"
        },
        {
            "datetime": "2024-03-07",
            "open": "169.14999",
            "high": "170.73000",
            "low": "168.49001",
            "close": "169.00000",
            "volume": "71765100"
        },
        {
            "datetime": "2024-03-06",
            "open": "171.06000",
            "high": "171.24001",
            "low": "168.67999",
            "close": "169.12000",
            "volume": "68587700"
        },
        {
            "datetime": "2024-03-05",
            "open": "170.75999",
            "high": "172.03999",
            "low": "169.62000",
            "close": "170.12000",
            "volume": "95132400"
        },
        {
            "datetime": "2024-03-04",
            "open": "176.14999",
            "high": "176.89999",
            "low": "173.78999",
            "close": "175.10001",
            "volume": "81510100"
        },
        {
            "datetime": "2024-03-01",
            "open": "179.55000",
            "high": "180.53000",
            "low": "177.38000",
            "close": "179.66000",
            "volume": "73488000"
        },
        {
            "datetime": "2024-02-29",
            "open": "181.27000",
            "high": "182.57001",
            "low": "179.53000",
            "close": "180.75000",
            "volume": "136682600"
        },
        {
            "datetime": "2024-02-28",
            "open": "182.50999",
            "high": "183.12000",
            "low": "180.13000",
            "close": "181.42000",
            "volume": "48953900"
        },
        {
            "datetime": "2024-02-27",
            "open": "181.10001",
            "high": "183.92000",
            "low": "179.56000",
            "close": "182.63000",
            "volume": "54318900"
        },];
export default function Home() {
  return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div>
          <Chart data={data_test}/>
          </div>

          <div>
          <CandlestickChart newData={new_data}/>
          </div>
        </main>
      );
}
