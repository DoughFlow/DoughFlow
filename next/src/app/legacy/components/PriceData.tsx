'use server'

interface DataPoint {
  timestamp: string;
  ticker: string;
  open_price: number;
  high_price: number;
  low_price: number;
  close_price: number;
  volume: number;
  candle_time: string;
};

const PriceData = async (ticker:string, date:string) => {
    const response = await fetch(`http://3.140.61.213/api/${ ticker }/${ date }`);
    const json_data = await response.json();
    
    const data: DataPoint[] = json_data.map((dp: any) => ({
        timestamp: dp.timestamp,
        open_price: dp.open_price,
        high_price: dp.high_price,
        low_price: dp.low_price,
        close_price: dp.close_price,
        volume: dp.volume
    }));
    return (
        data
    )
}

export default PriceData;
