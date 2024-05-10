"use server";

const IndicatorData = async (ticker: string, indicator: string) => {
  const response = await fetch(
    `http://3.140.61.213/api/${ticker}/${indicator}/6m`,
  );
  const json_data = await response.json();

  let data: IndicatorDataPoint[] = [];

  switch (indicator) {
    case "vol": {
      data = json_data.map((dp: any) => ({
        timestamp: dp.timestamp,
        volume: dp.volume,
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
