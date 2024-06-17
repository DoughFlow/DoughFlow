'use client'
import React from 'react';
import SmallOutput from './SmallOutput';

interface Props {
    results: string[];
}

const SmallResults = ({ results }: Props) => {
    return (
        <div className='flex-1'>
            <div>
                {results && results.map((result, index) => (
                    <SmallOutput key={index} result={result} />
                ))}
            </div>
        </div>
    );
};

export default SmallResults;
