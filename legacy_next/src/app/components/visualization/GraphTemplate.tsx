'use client'
import * as d3 from 'd3';
import React, { useEffect, useState } from 'react';
import PriceGraph from '@/components/visualization/PriceGraph';
import PriceData from '@/components/visualization/PriceData';
import IndicatorGraph from '@/components/visualization/IndicatorGraph';

const GraphTemplate = (
    {ticker, ticker2, temp}:
    {ticker: string, ticker2: string, temp: string}) => {

    if (temp !== '') {
        if (ticker2 !== '') {
            if (temp === 'sisi') {
                console.log('stock ind stock ind')
                return (
<div>
    <div>
        <PriceGraph {...{ticker}}/>
    </div>
    <div>
        <IndicatorGraph {...{ticker}}/>
    </div>
    <div>
        <PriceGraph ticker={ticker2}/>
    </div>
    <div>
        <IndicatorGraph ticker={ticker2}/>
    </div>
</div>
);
            }
            if (temp === 'ssi') {
                console.log('stock stock ind')
                return (
<div>
    <div>
        <PriceGraph {...{ticker}}/>
    </div>
    <div>
        <PriceGraph ticker={ticker2}/>
    </div>
    <div>
        <IndicatorGraph ticker={ticker2}/>
    </div>
</div>
);
            }
            if (temp === 'sis') {
                console.log('stock ind stock')
                return (
<div>
    <div>
        <PriceGraph {...{ticker}}/>
    </div>
    <div>
        <IndicatorGraph {...{ticker}}/>
    </div>
    <div>
        <PriceGraph ticker={ticker2}/>
    </div>
</div>
);
            }
        }
    }
    
    if (ticker2 !== '') {
        console.log('stock stock')
        return (
<div>
    <div>
        <PriceGraph {...{ticker}}/>
    </div>
    <div>
        <PriceGraph ticker={ticker2}/>
    </div>
</div>
        );
    }

    return (
        <div>
            <PriceGraph {...{ticker}}/>
            <p>I love {ticker}, { ticker2}, and&nbsp;{temp}</p>
        </div>
    )

}

export default GraphTemplate;
