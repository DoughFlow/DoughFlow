import { smPriceSvg, priceSvg } from "./Price"
import { smVolSvg, volSvg } from "./Vol"
import { smSmaSvg, smaSvg } from "./Sma"
import { smRsiSvg, rsiSvg } from "./Rsi"
import { Stock } from "@/components/StockContext";

export const generateYTickMarks = (min: number, max: number): {tens: number[], fives: number[], ones: number[]} => {
    const range = max - min;
    const tens = [];
    const fives = [];
    const ones = [];
    let startTen = Math.ceil(min / 10) * 10;
    let startFive = Math.ceil(min / 5) * 5;
    let startOne = Math.ceil(min);
    for (let i = startTen; i <= max; i += 10) {
        tens.push(i);
    }
    if (range < 40 || range >= 40) {
        for (let i = startFive; i <= max; i += 5) {
            if (i % 10 !== 0) {
                fives.push(i);
            }
        }
    }
    if (range < 40) {
        for (let i = startOne; i <= max; i++) {
            if (i % 5 !== 0 && i % 10 !== 0) { 
                ones.push(i);
            }
        }
    }  
    return { tens, fives, ones };
};

export const generateSvg =  (data: any, stock: Stock, height: number, width: number): string => {
    if (height < 350 || width < 350) {
        if (stock.value === "price") {
            const svg = smPriceSvg(data, height, width);
            return svg;
        } else if (stock.value === "vol") {
            const svg = smVolSvg(data, height, width);
            return svg;
        } else if (stock.value === "sma") {
            const svg = smSmaSvg(data, height, width);
            return svg;
        } else {
            const svg = smRsiSvg(data, height, width);
            return svg;
        }
    } else {
        if (stock.value === "price") {
            const svg = priceSvg(data, height, width);
            return svg;
        } else if (stock.value === "vol") {
            const svg = volSvg(data, height, width);
            return svg;
        } else if (stock.value === "sma") {   
            const svg = smaSvg(data, height, width);
            return svg;
        } else {
            const svg = rsiSvg(data, height, width);
            return svg;
        }
    }
};
