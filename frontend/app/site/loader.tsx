import * as dummyData from '../BTC_USD_1day_data.json';

//console.log(dummyData.meta);
interface meta_type {
    symbol: string;
    interval: string;
    currency_base: string;
    currency_quote: string;
    exchange: string;
    type: string;
    }
interface values_type {
    datetime: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    }
interface stock_json {
    meta: meta_type;
    values: values_type[];
    }
function parseDate(value: string): Date {
    return new Date(value)
};
function parseJsonData(data: any): stock_json{
    const values: values_type[] = data.values.map((item: any) => ({
        ...item,
        datetime: parseDate(item.datetime),
        open: parseFloat(item.open), // Convert to number
        high: parseFloat(item.high), // Convert to number
        low: parseFloat(item.low), // Convert to number
        close: parseFloat(item.close), // Convert to number
        }))
    return {meta: data.meta,
    values,}
}


function DummyData(): stock_json {
    //let unknownData: unknown = dummyData;
    
    return parseJsonData(dummyData);
    }

export default DummyData;
