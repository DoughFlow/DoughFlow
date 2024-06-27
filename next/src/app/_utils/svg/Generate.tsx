import { smPriceSvg, priceSvg } from "./Price"
import { smVolSvg, volSvg } from "./Vol"
import { smSmaSvg, smaSvg } from "./Sma"
import { smRsiSvg, rsiSvg } from "./Rsi"
import { Stock } from "@/components/StockContext";
import {
    utcYear,
    utcMonth
} from "d3";

export const margin = { top: 16, right: 20, bottom: 16, left: 20 };

export const yBuffered = (minPrice: number, maxPrice: number): [number, number] => {
  const range = maxPrice - minPrice;
  const bufferPercentage = 0.1;
  const bufferedMinPrice = minPrice - range * bufferPercentage;
  const bufferedMaxPrice = maxPrice + range * bufferPercentage;
  return [bufferedMinPrice, bufferedMaxPrice];
}

export const centTick = (min: number, max: number): number[] => {
  const cents: number[] = [];
  for (let i = Math.ceil(min / 100) * 100; i <= max; i += 100) {
    cents.push(i);
  }
  return cents;
};

export const tensTick = (min: number, max: number): number[] => {
  const tens: number[] = [];
  for (let i = Math.ceil(min / 10) * 10; i <= max; i += 10) {
    if (i % 100 !== 0) {
      tens.push(i);
    }
  }
  return tens;
};

export const fivesTick = (min: number, max: number): number[] => {
  const cents = centTick(min, max);
  const tens = tensTick(min, max);
  const fives: number[] = [];
  for (let i = Math.ceil(min / 5) * 5; i <= max; i += 5) {
    if (!cents.includes(i) && !tens.includes(i)) {
      fives.push(i);
    }
  }
  return fives;
};

export const onesTick = (min: number, max: number): number[] => {
  const cents = centTick(min, max);
  const tens = tensTick(min, max);
  const fives = fivesTick(min, max);
  const ones: number[] = [];
  for (let i = Math.ceil(min); i <= max; i++) {
    if (!cents.includes(i) && !tens.includes(i) && !fives.includes(i)) {
      ones.push(i);
    }
  }
  return ones;
};


export const yearTick = (stringList: string[]): string[] => {
  const ticks: string[] = [];
  let lastYear: Date | null = null;
  stringList.forEach(str => {
    const date = new Date(str);
    const startOfYear = utcYear.floor(date);
    if (!lastYear || startOfYear > lastYear) {
      ticks.push(str);
      lastYear = startOfYear;
    }
  });
  return ticks;
};

export const threeMonthsTick = (stringList: string[]): string[] => {
  const years = yearTick(stringList);
  const ticks: string[] = [];
  let lastQuarter: Date | null = null;
  stringList.forEach(str => {
    const date = new Date(str);
    const month = date.getUTCMonth();
    const quarterStart = new Date(Date.UTC(date.getUTCFullYear(), Math.floor(month / 3) * 3, 1));
    if ((!lastQuarter || quarterStart > lastQuarter) && !years.includes(str)) {
      ticks.push(str);
      lastQuarter = quarterStart;
    }
  });
  return ticks;
};

export const monthTick = (stringList: string[]): string[] => {
  const years = yearTick(stringList);
  const ticks: string[] = [];
  let lastMonth: Date | null = null;
  stringList.forEach(str => {
    const date = new Date(str);
    const startOfMonth = utcMonth.floor(date);
    if ((!lastMonth || startOfMonth > lastMonth) && !years.includes(str)) {
      ticks.push(str);
      lastMonth = startOfMonth;
    }
  });
  return ticks;
};

export const weekStartTick = (stringList: string[]): string[] => {
  const years = yearTick(stringList);
  const months = monthTick(stringList);
  const ticks: string[] = [];
  let lastWeekStart: Date | null = null;
  stringList.forEach(str => {
    const date = new Date(str);
    const weekStart = new Date(date);
    weekStart.setUTCDate(date.getUTCDate() - date.getUTCDay() + 1);
    if ((!lastWeekStart || weekStart > lastWeekStart) && !years.includes(str) && !months.includes(str)) {
      ticks.push(str);
      lastWeekStart = weekStart;
    }
  });
  return ticks;
};

export const dayTick = (stringList: string[]): string[] => {
  const months = monthTick(stringList);
  const weeks = weekStartTick(stringList);
  const ticks: string[] = [];
  let lastDay: Date | null = null;
  stringList.forEach(str => {
    const date = new Date(str);
    if ((!lastDay || date.getUTCDate() !== lastDay.getUTCDate()) && !months.includes(str) && !weeks.includes(str)) {
      ticks.push(str);
      lastDay = date;
    }
  });
  return ticks;
};

export const generateSvg =  (data: any, stock: Stock, height: number, width: number): string => {
    if (height < 450 || width < 450) {
        if (stock.value === "price") {
            const svg = smPriceSvg(data, height, width, stock.time);
            return svg;
        } else if (stock.value === "vol") {
            const svg = smVolSvg(data, height, width, stock.ticker, stock.time);
            return svg;
        } else if (stock.value === "sma") {
            const svg = smSmaSvg(data, height, width, stock.ticker, stock.time);
            return svg;
        } else {
            const svg = smRsiSvg(data, height, width, stock.ticker, stock.time);
            return svg;
        }
    } else {
        if (stock.value === "price") {
            const svg = priceSvg(data, height, width, stock.time);
            return svg;
        } else if (stock.value === "vol") {
            const svg = volSvg(data, height, width, stock.ticker, stock.time);
            return svg;
        } else if (stock.value === "sma") {   
            const svg = smaSvg(data, height, width, stock.ticker, stock.time);
            return svg;
        } else {
            const svg = rsiSvg(data, height, width, stock.ticker, stock.time);
            return svg;
        }
    }
};
