import React, { useEffect, useState } from 'react';
import SearchGraph from './SearchGraph';

interface GraphDataProps {
    ticker: string;
    size: number;
}

const GraphData = ({ ticker, size }: GraphDataProps) => {
    const [dataPoints, setDataPoints] = useState<number[]>([]);

    useEffect(() => {
        const getPreviewData = async () => {
            const response = await fetch(`http://dough-flow.com/api/${ticker}/1m`);
            const data = await response.json();
            setDataPoints(data);
        };

        if (ticker) {
            getPreviewData();
        }
    }, [ticker]);

    return (
        <div>

            {size === 0 ? (
                <div>
                    <SearchGraph dataPoints={dataPoints} />
                </div>
            ) : (
                <div>
                    <SearchGraph dataPoints={dataPoints} />
                </div> // Default case
            )}
        </div>
    );
};

export default GraphData;
