import React from 'react'

function Stocks({ list }) {
  if (!list) {
    return <div>No data available</div>;
  }

  return (
    <ul>
      {list.map((item, index) => (
        <li key={index}>
          {/* Render each item however you want */}
          {JSON.stringify(item)}
        </li>
      ))}
    </ul>
  );
}

export default Stocks;

