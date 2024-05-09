import React from 'react';

function TestData({ data }) {
  return (
    <div>
      {/* Render components based on fetched data */}
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

TestData.getInitialProps = async () => {
  try {
    const response = await fetch('http://api.example.com/data');
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: [] };
  }
};

export default TestData;

