import React from 'react';
import Link from 'next/link';
import GraphData from './GraphData';


interface Props {
    result: string;
}

const SearchOutput = ({ result }: Props) => {
    return (
        <Link href={`/${result}`} className="block px-1 py-2 my-4 w-full text-left">
            <div className='flex justify-between items-center w-full'>
                <div className='flex-1 text-2xl'>
                    {result}
                </div>
                <div className='w-5/6 mx-4'>
                    <GraphData ticker={result} size={0}/>
                </div>
            </div>
        </Link>
    );
};

export default SearchOutput;
