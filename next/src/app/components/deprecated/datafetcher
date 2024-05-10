import React from 'react';

function DataFetcher({ data }) {
  console.log('Data received in component:', data);
  return (
    <div>
      <h1>Server-Side Data Fetching</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

