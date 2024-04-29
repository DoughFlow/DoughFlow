import React, { useEffect, useState } from 'react';
import SearchGraph from './SearchGraph';

interface GraphDataProps {
  ticker: string;
  size: number;
}

const GraphData = ({ ticker, size }: GraphDataProps) => {
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  const graphSize = `min-h-[${size}rem] max-h-[${size}rem]`;

  useEffect(() => {
    const getPreviewData = async () => {
      const response = await fetch(`http://3.140.61.213/api/week/${ticker}`);
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
                <div className='min-h-[6rem] max-h-[6rem]'>
                  <SearchGraph dataPoints={dataPoints} />
                </div>
            ) : (
                <div className='min-h-[10rem] max-h-[10rem]'>
                  <SearchGraph dataPoints={dataPoints} />
                </div> // Default case
            )}
        </div>
        );
};

export default GraphData;