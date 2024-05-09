interface IndicatorGraphData {
  timestamp: string;
  volume: number;
}

interface IndicatorGraphProps {
  data: IndicatorGraphData[];
}

const IndicatorGraph = ({ticker}: {ticker: string}) => {

  return(
    <div>I&apos;m the Indicatorrrr for {ticker}</div>
  );
}

export default IndicatorGraph
