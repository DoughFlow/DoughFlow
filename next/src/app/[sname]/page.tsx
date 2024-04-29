import SearchFooter from '@/components/search/footer/SearchFooter';
import React from 'react';

type ParamsType = {
    params: {
        sname: string;
    }
}

export function generateStaticParams() {
    return [{ sname: 'AAPL' }]
}


const StockPage = ({ params }: ParamsType) => {
    return (
        <div>
            <div>
                {params.sname}
            </div>
            <div className='absolute bottom-0 left-0 right-0 text-center'>
                <SearchFooter />
            </div>
        </div>
    );
};
export default StockPage;
