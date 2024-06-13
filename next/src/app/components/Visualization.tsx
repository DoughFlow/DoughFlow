import { useStocks } from "@C/StockContext";

const Visualization = () => {

  const { stocks } = useStocks();
  const renderStockSVG = (index: number) => {
      if (index < stocks.length && stocks[index] && stocks[index].svg) {
        return (
          <div dangerouslySetInnerHTML={{__html: stocks[index].svg || ""}} />
        );
      }
      return null; // Return null or some fallback component if stock doesn't exist
    };

    return (
      <div className="flex flex-col min-h-screen min-w-screen m-0 z-0">
        <div className="flex flex-row">
          {renderStockSVG(0)}
          {renderStockSVG(3)}
        </div>

        <div className="flex flex-row">
          {renderStockSVG(1)}
          {renderStockSVG(2)}
          {renderStockSVG(4)}
        </div>
      </div>
    );
}


export default Visualization;
