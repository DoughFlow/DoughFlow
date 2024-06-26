'use client'
import { useGlobal } from "./GlobalContext";
import PriceGraph from "./PriceGraph";
import IndicatorGraph from "./IndicatorGraph";

const GraphElement = () => {

    const { stocks } = useGlobal();

    let screenWidth = 0;
    let screenHeight = 0;

    const ticker1 = stocks.ticker1;

    const ticker2 = stocks.ticker2;

    const date1 = stocks.date1;

    const date2 = stocks.date2;

    const indicator1 = stocks.indicator1;
    
    const indicator2 = stocks.indicator2;

    const position1 = stocks.position1;

    const position2 = stocks.position2;
    if (typeof window !== "undefined") {
      const screenWidth = window.innerWidth;
    }
    const graphWidth = screenWidth * 0.93;
    const midWidth = graphWidth * 0.5;
    if (typeof window !== "undefined") {
    const screenHeight = window.innerHeight;
    }
    const graphHeight = screenHeight * 0.25;
    const midHeight = graphHeight * 2;
    const indHeight = graphHeight * 0.5;



    const renderGraphs = (position: string) => {
        if (position === 'top') {
            return (
                <div className="pl-6 pr-10">
                    <PriceGraph ticker={ticker1} date={date1} height={graphHeight} width={graphWidth} />
                    <IndicatorGraph ticker={ticker1} date={date1} indicator={indicator1} height={indHeight} width={graphWidth} />
                    {ticker2 && (
                        <>
                            <PriceGraph ticker={ticker2} date={date2} height={graphHeight} width={graphWidth} />
                            <IndicatorGraph ticker={ticker2} date={date2} indicator={indicator2} height={indHeight} width={graphWidth} />
                        </>
                    )}
                </div>
            );
        } else if (position === 'left') {
            return (
                <div className="pl-6 pr-10 flex flex-row">
                    <div>
                        <PriceGraph ticker={ticker1} date={date1} height={midHeight} width={midWidth} />
                        <IndicatorGraph ticker={ticker1} date={date1}  indicator={indicator1} height={indHeight} width={midWidth} />
                    </div>
                    {ticker2 && (
                        <div>
                            <PriceGraph ticker={ticker2} date={date2} height={midHeight} width={midWidth} />
                            <IndicatorGraph ticker={ticker2} date={date2}  indicator={indicator2} height={indHeight} width={midWidth} />
                        </div>
                    )}
                </div>
            );
        }
    };
    /*
    <div>
        {Object.entries(stocks).map(([key, value]) => (
            <div key={key}>{key}: {value}</div>))}
    </div>
    */
    return (
        <>
            {renderGraphs(position1)}
        </>
    );
};

export default GraphElement;