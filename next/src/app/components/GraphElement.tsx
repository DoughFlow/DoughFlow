'use client'
import { useGlobal } from "./GlobalContext";
import PriceGraph from "@/components/visualization/PriceGraph";

const GraphElement = () => {

    const { stocks } = useGlobal();
    const ticker = "AAPL"

    return (
        <div>
	<div>
		<PriceGraph {...{ticker}}/>
	</div>
            {Object.entries(stocks).map(([key, value]) => (
                <div key={key}>{key}: {value}</div>
            ))}
        </div>
    );

}

export default GraphElement;
