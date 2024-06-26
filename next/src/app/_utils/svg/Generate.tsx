import {
    smPriceSvg,
    priceSvg
} from "./Price"
import {
    smVolSvg,
    volSvg
} from "./Vol"
import {
    smSmaSvg,
    smaSvg
} from "./Sma"
import {
    smRsiSvg,
    rsiSvg
} from "./Rsi"

import { Stock } from "@/components/StockContext";

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
