import Stocks from '@components/Stocks'
import AreaGraph from '@components/AreaGraph'
//mocked data for this interaction
const mockData = [{"timestamp":"2023-05-01","ticker":"AAPL","open_price":"169.28","high_price":"170.45","low_price":"168.64","close_price":"169.59","volume":52472900,"candle_time":450},
{"timestamp":"2023-05-02","ticker":"AAPL","open_price":"170.09","high_price":"170.35","low_price":"167.54","close_price":"168.54","volume":48425700,"candle_time":4500},
{"timestamp":"2023-05-03","ticker":"AAPL","open_price":"169.50","high_price":"170.92","low_price":"167.16","close_price":"167.45","volume":65136000,"candle_time":4500},
{"timestamp":"2023-05-04","ticker":"AAPL","open_price":"164.89","high_price":"167.04","low_price":"164.31","close_price":"165.79","volume":81235400,"candle_time":4500},
{"timestamp":"2023-05-05","ticker":"AAPL","open_price":"170.98","high_price":"174.30","low_price":"170.76","close_price":"173.57","volume":113316400,"candle_time":4500},
{"timestamp":"2023-05-08","ticker":"AAPL","open_price":"172.48","high_price":"173.85","low_price":"172.11","close_price":"173.50","volume":55962800,"candle_time":4500},]
//const response = await fetch("http://3.140.61.213/api/aapl/1y")
async function getStocks(ticker: string) {
  const res = await fetch(`http://3.140.61.213/api/${ticker}/1y`);
  return res.json()
}

export default async function Page({
  params: { ticker },
}:  {
  params: { ticker: string}
}) {
//  const stockData = await getStocks(ticker);
 
  return (
    <>
      <h1>Big Test { ticker }</h1>
      <AreaGraph list={mockData} />
    </>
  )
}

      //<Stocks list={mockData} />

//<Stocks list={stockData}></Stocks>
