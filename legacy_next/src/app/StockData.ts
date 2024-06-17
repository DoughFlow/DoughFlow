// TypeScript object for the Stock Data from API
export interface StockData {
  timestamp: string
  ticker: string
  open_price: string
  high_price: string
  low_price: string
  close_price: string
  volume: string
  candle_time: string 
}
