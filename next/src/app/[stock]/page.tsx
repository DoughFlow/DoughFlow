'use client'
import { useGlobal, StockData } from '@/components/GlobalContext';

const StockPage = ({ params }: { params: { stock: string } }) => {
    const { stocks, addStock, clearStock } = useGlobal();

    

    const saveStock = () => {
        const newStock: StockData = {
            ticker: params.stock,
            indicator: 'vol',
            position: 'left'
        };
        addStock(newStock);
    }

    return (
        <div>
            <button onClick={saveStock}>Add Stock</button>
            {stocks.map((stock, index) => (
                <p key={index}>{stock.ticker} - {stock.indicator} - {stock.position}</p>
            ))}
            <button onClick={clearStock}>Clear Stock</button>
        </div>
    );
};
export default StockPage;

