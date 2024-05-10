'use client'
import { useGlobal } from "./GlobalContext";

const GraphElement = () => {

    const { stocks } = useGlobal();

    return (
        <div>
            {Object.entries(stocks).map(([key, value]) => (
                <div key={key}>{key}: {value}</div>
            ))}
        </div>
    );

}

export default GraphElement;
