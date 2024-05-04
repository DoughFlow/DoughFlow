'use client'
import { useSearchParams } from 'next/navigation';
import VisualizationContainer from '@components/visualization/VisualizationContainer';
import SearchFooter from '@/components/search/footer/SearchFooter';

const StockPage = ({ params }: { params: { stock: string} }) => {
   
    const searchParams = useSearchParams();
    const stock2 = searchParams.get('comp') || '';
    const temp = searchParams.get('temp') || '';

    return (
        <div>
            { params.stock }, Conditional value : { stock2 }
            <VisualizationContainer ticker={params.stock} ticker2={stock2} temp={temp} />
            <div className='absolute bottom-0 left-0 right-0 text-center'>
                <SearchFooter />
            </div>
        </div>
    );
};
export default StockPage;
