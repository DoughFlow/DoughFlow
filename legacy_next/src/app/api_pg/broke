import React from 'react';

function StockDataList({ stockData }) {
  return (
    <div>
      <h1>Stock Data List</h1>
      <ul>
        {stockData.map((item, index) => (
          <li key={index}>
            <p>Date: {item.timestamp}</p>
            <p>Open Price: {item.open_price}</p>
            <p>High Price: {item.high_price}</p>
            <p>Low Price: {item.low_price}</p>
            <p>Close Price: {item.close_price}</p>
            <p>Volume: {item.volume}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockDataList;

export async function getServerSideProps(context) {
  try {
    // Fetch data from the API
    const res = await fetch('http://stockapi.com/api/tsla/6m');
    const data = await res.json();

    // Return data as props
    return {
      props: {
        stockData: data
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        stockData: []
      }
    };
  }
}

