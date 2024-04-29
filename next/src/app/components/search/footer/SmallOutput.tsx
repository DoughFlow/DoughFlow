import React from 'react';
import Link from 'next/link';


interface Props {
    result: string;
}

const SmallOutput = ({ result }: Props) => {
    return (
        <Link href={`/${result}`} className="block px-1 py-2 w-full text-left hover:bg-gray-100 focus:bg-gray-100">
            <div className='flex justify-between items-center w-full'>
                <div className='flex-1'>
                    {result}
                </div>
            </div>
        </Link>
    );
};

export default SmallOutput;
