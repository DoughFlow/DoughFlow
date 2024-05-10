'use server'

const IndicatorData = async (ticker:string) => {
    const response = await fetch(`http://3.140.61.213/api/${ ticker }/6m`);
    const json_data = await response.json();
    
    const data: IndicatorDataPoint[] = json_data.map((dp: any) => ({
        timestamp: dp.timestamp,
        sma: dp.sma,
        macd: dp.macd,
        volume: dp.volume, // here for now
    }));
    return (
        data
    )
}

export default IndicatorData;
