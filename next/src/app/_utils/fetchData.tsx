"use server"
export interface PriceDataPoint {
  timestamp: string;
  ticker: string;
  open_price: number;
  high_price: number;
  low_price: number;
  close_price: number;
}

export interface volDataPoint {
  timestamp: string;
  vol:  string;
}

export interface smaDataPoint {
  timestamp: string;
  sma: string;
}

export interface rsiDataPoint {
  timestamp: string;
  rsi: string;
}

export const fetchPriceData = async (ticker: string, time: string, value: string): Promise<PriceDataPoint[]> => {
  const res = await fetch(`http://dough-flow.com/api/${ticker}/${time}`);
  if (!res.ok) throw new Error("Network response was not ok");
  const jsonData = await res.json();
  const data: PriceDataPoint[] = jsonData.map((dp: any): PriceDataPoint => ({
    timestamp: dp.timestamp,
    ticker: ticker,
    open_price: dp.open_price,
    high_price: dp.high_price,
    low_price: dp.low_price,
    close_price: dp.close_price,
  }));
  return data;
}

export const fetchVolData = async (ticker: string, time: string, value: string): Promise<volDataPoint[]> => {
  const res = await fetch(`http://dough-flow.com/api/${ticker}/${value}/${time}`);
  if (!res.ok) throw new Error("Network response was not ok");
  const jsonData = await res.json();
  const data: volDataPoint[] = jsonData.map((dp: any): volDataPoint => ({
    timestamp: dp.timestamp,
    vol: dp.volume
  }));
  return data;
};

export const fetchSmaData = async (ticker: string, time: string, value: string): Promise<smaDataPoint[]> => {
  const res = await fetch(`http://dough-flow.com/api/${ticker}/${value}/${time}`);
  if (!res.ok) throw new Error("Network response was not ok");
  const jsonData = await res.json();
  const data: smaDataPoint[] = jsonData.map((dp: any): smaDataPoint => ({
    timestamp: dp.timestamp,
    sma: dp.sma
  }));
  return data;
};

export const fetchRsiData = async (ticker: string, time: string, value: string): Promise<rsiDataPoint[]> => {
  const res = await fetch(`http://dough-flow.com/api/${ticker}/${value}/${time}`);
  if (!res.ok) throw new Error("Network response was not ok");
  const jsonData = await res.json();
  const data: rsiDataPoint[] = jsonData.map((dp: any): rsiDataPoint => ({
    timestamp: dp.timestamp,
    rsi: dp.rsi
  }));
  return data;
};
