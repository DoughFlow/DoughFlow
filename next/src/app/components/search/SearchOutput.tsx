import React from 'react';
import SearchGraph from './SearchGraph';
import Link from 'next/link';


interface Props {
    result: string;
}

const SearchOutput = ({ result }: Props) => {
    return (
        <Link href={`/${result}`} className="block px-1 py-2 my-4 w-full text-left hover:bg-gray-100 focus:bg-gray-100">
            <div className='flex justify-between items-center w-full'>
                <div className='flex-1 text-2xl'>
                    {result}
                </div>
                <div>
                    div for graph
                </div>
            </div>
        </Link>
    );
};

export default SearchOutput;
