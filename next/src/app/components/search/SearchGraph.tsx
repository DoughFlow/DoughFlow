'use server'
import React from 'react';


interface Props {
    result: string;
}


const SearchGraph = async ({ result }: Props) => {
    const graphData = await fetch(`http://localhost:8000/api/week/${result}`);
    console.log(graphData)
    return (
        <div>
            {result} 
        </div>
    );
};

export default SearchGraph;
