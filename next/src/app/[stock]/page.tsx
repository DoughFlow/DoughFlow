'use client'
import { useEffect, useRef } from 'react';
import { useGlobal } from '@/components/GlobalContext';
import VisualizationContainer from '@/components/VisualizationContainer';

function StockPage({ params }: { params: { stock: string } }) {
    // Add context and Ref for useEffect
    const { stocks, initStock} = useGlobal();
    const hasLogged = useRef(false);

    // Initialize stock once based on the URL parameter
    useEffect(() => {
        if (!hasLogged.current) {
            initStock(params.stock);
            hasLogged.current = true;
        }
    }, [params.stock, initStock]);


    return (
        <div>
            <div>
                <VisualizationContainer/>
            </div>
        </div>
    );
};

export default StockPage;
