import { useStocks } from "@C/StockContext";
import { Stock } from "@C/StockContext";

const Visualization = () => {

  const { stocks } = useStocks();
  
  const length = stocks.length;

  return (
  
  <div className="flex flex-col min-h-screen min-w-screen m-0 z-0">
    <div className="flex flex-row">
      <div>
        { stocks[0].svg }
      </div>
      <div>
        { stocks[1].svg }
      </div>
    </div>
    <div className="flex flex-row">
      <div>
        { stocks[2].svg }
      </div>
      <div>
        { stocks[3].svg }
      </div>
      <div>
        { stocks[4].svg }
      </div>
    </div>
  </div>

  
  );
}


export default Visualization;
