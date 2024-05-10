'use client'
import { useGlobal } from "./GlobalContext";
import PriceGraph from "@/components/visualization/PriceGraph";
import IndicatorGraph from "@/components/visualization/IndicatorGraph";

const GraphElement = () => {

    const { stocks } = useGlobal();

    const ticker1 = stocks.ticker1;

    const ticker2 = stocks.ticker2;

    const indicator1 = stocks.indicator1;
    
    const indicator2 = stocks.indicator2;

    return (
        <div className="pl-6">
            <div>
                <PriceGraph ticker={ticker1}/>
                <IndicatorGraph ticker={ticker1} indicator={indicator1}/>
		{stocks.ticker2 && <PriceGraph ticker={ticker2}/>}
		{stocks.ticker2 && <IndicatorGraph ticker={ticker2} indicator={indicator2}/>}
            </div>
            {Object.entries(stocks).map(([key, value]) => (
                <div key={key}>{key}: {value}</div>
            ))}
        </div>
    );

}

export default GraphElement;
