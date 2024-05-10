'use server'

interface IndicatorDataPoint {
	timestamp: string;
    indicator: string;
	value: number;
}

type IndicatorData = {
    indicatorList: IndicatorDataPoint[];
}

const IndicatorData = async (ticker:string, indicator:string) => {
    const response = await fetch(`http://3.140.61.213/api/${ ticker }/${ indicator }/6m`);
    const jsonData = await response.json();
    
    const data: IndicatorDataPoint[] = jsonData.map((dp: any) => {
        const { timestamp, ...rest } = dp;
        const indKey = Object.keys(rest)[0]; // Assuming only one key apart from timestamp
        return {
            timestamp,
            indicator: indKey,  // Use the dynamic key name as the indicator
            value: Number(dp[indKey])  // Convert the value to a number
        };
    });
    return (
        data
    )
}

export default IndicatorData;
