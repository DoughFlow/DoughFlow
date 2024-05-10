import React from 'react';
import Link from 'next/link';


interface Props {
    result: string;
}

const SmallOutput = ({ result }: Props) => {
    return (
        <Link href={`/${result}`} className=''>
            <div className=''>
                <div className=''>
                    {result}
                </div>
            </div>
        </Link>
    );
};

export default SmallOutput;
