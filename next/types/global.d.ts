export {}

declare global {
    interface DataPoint {
      timestamp: string;
      ticker: string;
      open_price: number;
      high_price: number;
      low_price: number;
      close_price: number;
      volume: number;
      candle_time: string;
    }
}
