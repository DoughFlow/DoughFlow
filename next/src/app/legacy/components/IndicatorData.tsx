"use server";

interface IndicatorDataPoint {
  timestamp: string;
  sma?: number;
  rsi?: number;
  macd?: number;
  volume?: number;
};

const IndicatorData = async (ticker: string, date: string, indicator: string) => {
  const response = await fetch(
    `http://dough-flow.com/api/${ticker}/${indicator}/${ date }`,
  );
  const json_data = await response.json();

  let data: IndicatorDataPoint[] = [];

  switch (indicator) {
    case "vol": {
      data = json_data.map((dp: any) => ({
        timestamp: dp.timestamp,
        volume: dp.vol,
      }));
      break;
    }
    case "sma": {
      data = json_data.map((dp: any) => ({
        timestamp: dp.timestamp,
        sma: dp.sma,
      }));
      break;
    }
    case "rsi": {
      data = json_data.map((dp: any) => ({
        timestamp: dp.timestamp,
        rsi: dp.rsi,
      }));
      break;
    }
  }

  return data;
};

export default IndicatorData;
