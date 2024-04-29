import Stocks from '@components/Stocks'

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
  const stockData = await getStocks(ticker);
  
  return (
    <>
      <h1>Big Test { ticker }</h1>
      <Stocks list={stockData} />
    </>
  )
}


//<Stocks list={stockData}></Stocks>
