import React from 'react';
import Link from 'next/link';
import GraphData from './GraphData';


interface Props {
    result: string;
}

const SearchCard = ({ result }: Props) => {
    return (
        <Link href={`/${result}`} className="max-w-32 block my-4 p-2 border border-dfyellow rounded-xl">
            <div className='flex flex-col'>
                <div className='flex-1 text-2xl'>
                    {result}
                </div>
                <div className='flex-1'>
                    <GraphData ticker={result} size={0}/>
                </div>
            </div>
        </Link>
    );
};

export default SearchCard;
