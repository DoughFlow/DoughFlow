"use server"

export interface PriceDataPoint {
  timestamp: string;
  ticker: string;
  open_price: number;
  high_price: number;
  low_price: number;
  close_price: number;
}

export interface IndicatorDataPoint {
  timestamp: string;
  [key: string]: number | string;
}

export type DataPoint = PriceDataPoint | IndicatorDataPoint;

export const fetchData = async (ticker: string, time: string, value: string): Promise<DataPoint[]> => {
  if (value === "price") {
    const res = await fetch(`http://3.140.61.213/api/${ticker}/${time}`);
    if (!res.ok) throw new Error("Network response was not ok");
    const jsonData = await res.json();
    const data: DataPoint[] = jsonData.map((dp: any): PriceDataPoint => ({
      timestamp: dp.timestamp,
      ticker: ticker,
      open_price: dp.open_price,
      high_price: dp.high_price,
      low_price: dp.low_price,
      close_price: dp.close_price,
    }));
    return data;
  } else {
    const res = await fetch(`http://3.140.61.213/api/${ticker}/${value}/${time}`);
    if (!res.ok) throw new Error("Network response was not ok");
    const jsonData = await res.json();
    let data: DataPoint[] = [];
    switch (value) {
      case "vol":
        data = jsonData.map((dp: any): IndicatorDataPoint => ({
          timestamp: dp.timestamp,
          volume: dp.volume,
        }));
        break;
      case "sma":
        data = jsonData.map((dp: any): IndicatorDataPoint => ({
          timestamp: dp.timestamp,
          sma: dp.sma,
        }));
        break;
      case "rsi":
        data = jsonData.map((dp: any): IndicatorDataPoint => ({
          timestamp: dp.timestamp,
          rsi: dp.rsi,
        }));
        break;
    }
    return data;
  }
};
