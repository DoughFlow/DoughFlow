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
            {params.sname}
        </div>
    )
}
export default StockPage;
