import React from 'react';
import Link from 'next/link';


interface Props {
    result: string;
}

const SmallOutput = ({ result }: Props) => {
    return (
        <Link href={`/${result}`} target="_blank" rel="noopener noreferrer">
            <div className='bg-dfwhite pl-2 border-dfyellow border rounded my-1'>
                {result}
            </div>
        </Link>
    );
};

export default SmallOutput;
