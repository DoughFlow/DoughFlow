import yfinance as yf
import json
from datetime import datetime, timedelta


def split_date_range(start_date_str, end_date_str, interval):
    """
    Splits up the dates to appropriate ranges for yfinance calls

    Parameters:
    start_date_str (string)
    end_date_str (string)
    interval (string): interval in yfinance-supported format

    Returns:
    ranges (list of tuples)
    """
    # Convert strings to datetime objects
    if len(start_date_str) == 10:
        start_date_str += " 00-00-00"
    if len(end_date_str) == 10:
        end_date_str += " 23-59-59"
    start_date = datetime.strptime(start_date_str, "%Y-%m-%d %H-%M-%S")
    end_date = datetime.strptime(end_date_str, "%Y-%m-%d %H-%M-%S")
    
    # Calculate total duration between dates
    duration = end_date - start_date
    # print(str(duration))
    
    potential_intervals = {
        '1m':timedelta(days=7),
        '2m':timedelta(days=60),
        '5m':timedelta(days=60),
        '15m':timedelta(days=60),
        '30m':timedelta(days=60),  
        '60m':timedelta(days=60),
        '90m':timedelta(days=60),  
        '1h':timedelta(days=60),
        '1d':timedelta(weeks=5217.86), # this corresponds to 100 years
        '5d':timedelta(weeks=5217.86),
        '1wk':timedelta(weeks=5217.86),
        '1mo':timedelta(weeks=5217.86),
        '3mo':timedelta(weeks=5217.86),
    }

    try:
        interval_size = potential_intervals[interval]
        # Calculate number of intervals
        num_intervals = duration // interval_size
        # print("num_ints "+str(num_intervals))
        if num_intervals == 0:
            return [(start_date_str[:10],end_date_str[:10])]
        
        # Initialize list to store ranges
        ranges = []
        
        # Split range into equal parts
        for i in range(num_intervals):
            start_range = start_date + i * interval_size
            end_range = start_date + (i + 1) * interval_size
            ranges.append((start_range.strftime("%Y-%m-%d"), end_range.strftime("%Y-%m-%d"))) # we only call entire days. 
        
        return ranges
    except:
        raise ValueError("Invalid interval. Choose from appropriate yfinance intervals.")
    

def acquireTickerData(ticker, start_date, end_date, interval):
    """
    Function to pull an arbitrary date range of a single stock from yfinance and format it in json format.
    
    Parameters:
    ticker (string): string of the stock ticker
    start_date (string): Starting date string, in format "YYYY-MM-DD HH:MM:SS"
    end_date (string): Ending date string, in format "YYYY-MM-DD HH:MM:SS"
    interval (string): Desired interval for the data, in format "1min", "1h", "1day", etc (the way 12Data does it)

    Returns:
    stock_data (dictionary)
    """
    print("Start grabbing yfinance data.\n")
    # return variable initialization
    stock_data = {}
    values = []

    # Separate interval string for yfinance call and to match the 12data format
    integer_str, letters_str, _ = interval.partition(interval.lstrip("0123456789"))
    yf_interval_str = integer_str+letters_str[0]
    twelvedata_interval_str = interval

    # Split up the dates into date ranges corresponding to the allowed data pulling ranges of yfinance
    dateRanges = split_date_range(start_date, end_date, yf_interval_str)
    print("dateRanges: "+str(dateRanges))

    #Iterate over every dateRange
    for dateRange in dateRanges:
        data = yf.download(ticker, start=dateRange[0], end=dateRange[1], interval=yf_interval_str)
        for index, row in data.iterrows():
            values.append({
                "datetime": index.strftime('%Y-%m-%d %H:%M:%S'),
                "open": str(row['Open']),
                "high": str(row['High']),
                "low": str(row['Low']),
                "close": str(row['Close']),
                "volume": str(row['Volume'])
            })
    stock_data = {
        "meta":{
                "symbol": ticker,
                "interval": twelvedata_interval_str,
                "currency": "USD",  # Assuming USD for simplicity, you can get this from data.info['currency']
                "exchange_timezone": "America/New_York",  # yfinance gives time in this zone by default 
                "exchange": "NASDAQ",  # Assuming NASDAQ, you can get this from data.info['exchange']
                "type": "Common Stock"  # Assuming common stock, you can get this from data.info['quoteType']
                # mic_code would go here
            },
        "values": values,
    }
    
    return stock_data

def get_initial_date(symbol):
    """
    Acquires intitial date for stock data so no unneccesary calls are made for acquiring the stock's total history
    """
    # Fetch historical data for the stock
    stock_data = yf.download(symbol, start="1900-01-01", end="2100-01-01")
    
    # Extract the initial date from the DataFrame
    initial_date = stock_data.index[0].strftime('%Y-%m-%d')
    
    return initial_date


def save_stock_data_to_json(data, filename):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)

# This is the main function to be called
def acquireHistoricalData(tickers, interval: str, to_output: bool):
    """
    Acquires the historical data across the lifetime of a ticker using yfinance

    Parameters:
    tickers (list of strings): list of desired tickers in string format
    interval (string): in 12data supported format
    to_output (bool): if one wishes to write the output to files automatically

    Returns:
    historical_data (dictionary) 
    """
    historical_data = {}
    
    for ticker in tickers:
        start_date = get_initial_date(ticker)
        end_date = datetime.now().strftime("%Y-%m-%d")
        historical_data[ticker] = acquireTickerData(ticker,start_date,end_date,interval) 
    
    if to_output:
        # write files to output by naming schema defined here
        for key, value in historical_data.items():
            filename = key+"_"+interval+".json"
            save_stock_data_to_json(value, filename)

    return historical_data


def yf_stocks_singledaterange(tickers, start_date, end_date, interval):
    """
    OLD CODE, Still working but NOT RECOMMENDED

    Function to pull data from yfinance and format it in json format.
    
    Parameters:
    tickers (list): List of strings containing the stock tickers of interest
    start_date (string): Starting date string, in format "YYYY-MM-DD HH:MM:SS"
    end_date (string): Ending date string, in format "YYYY-MM-DD HH:MM:SS"
    interval (string): Desired interval for the data, in format "1min", "1h", "1day", etc (the way 12Data does it)

    Returns:
    stock_data (dictionary)
    """
    print("This probably isn't the function you are looking for. Use the historical funciton instead!!")
    print("Start grabbing yfinance data.\n")
    stock_data = {}
    # Separate interval string for yfinance call and for the 12data format
    integer_str, letters_str, _ = interval.partition(interval.lstrip("0123456789"))
    yf_interval_str = integer_str+letters_str[0]
    twelvedata_interval_str = interval
    # iterate over every ticker
    for ticker in tickers:
        data = yf.download(ticker, start=start_date, end=end_date, interval=yf_interval_str)
        meta = {
            "symbol": ticker,
            "interval": twelvedata_interval_str,
            "currency": "USD",  # Assuming USD for simplicity, you can get this from data.info['currency']
            "exchange_timezone": "America/New_York",  # yfinance gives time in this zone by default 
            "exchange": "NASDAQ",  # Assuming NASDAQ, you can get this from data.info['exchange']
            "type": "Common Stock"  # Assuming common stock, you can get this from data.info['quoteType']
            # mic_code would go here
        }
        values = []
        for index, row in data.iterrows():
            values.append({
                "datetime": index.strftime('%Y-%m-%d %H:%M:%S'),
                "open": str(row['Open']),
                "high": str(row['High']),
                "low": str(row['Low']),
                "close": str(row['Close']),
                "volume": str(row['Volume'])
            })
        stock_data[ticker] = {
            "meta": meta,
            "values": values,
            "status": "ok"
        }
    return stock_data


# some testing stuff
someTickers = ["TSLA","AAPL","PLTR","MARA","AMD","SOFI","NVDA","AMZN","SNAP"]

# testing
# hist_data = acquireHistoricalData(['TSLA','PLTR',"AMD"],'1day',to_output=True)
# save_stock_data_to_json(hist_data, "hist_data.json")

top_tickers = [
    "AAPL",
    "MSFT",
    "AMZN",
    "GOOGL",
    "GOOG",
    "META",
    "TSLA",
    "BRK-A",
    "BRK-B",
    "JPM",
    "JNJ",
    "V",
    "PG",
    "NVDA",
    "MA",
    "DIS",
    "UNH",
    "PYPL",
    "HD",
    "BAC",
    "CMCSA",
    "VZ",
    "ADBE",
    "INTC",
    "CRM",
    "T",
    "KO",
    "NFLX",
    "NKE",
    "PEP",
    "MRK",
    "XOM",
    "ABT",
    "CSCO",
    "CVX",
    "WMT",
    "TMO",
    "COST",
    "AVGO",
    "MDT",
    "ABBV",
    "PM",
    "LLY",
    "ACN",
    "QCOM",
    "NEE",
    "ORCL",
    "IBM",
    "SBUX",
    "DHR",
    "LMT",
    "LOW",
    "HON",
    "CHTR",
    "TXN",
    "AMGN",
    "UPS",
    "UNP",
    "NOW",
    "SPGI",
    "TFC",
    "INTU",
    "BLK",
    "RTX",
    "BDX",
    "SYK",
    "LIN",
    "GILD",
    "MMM",
    "CAT",
    "AMD",
    "MO",
    "ADP",
    "ZTS",
    "VRTX",
    "AXP",
    "MCD",
    "AMT",
    "ISRG",
    "MS",
    "FIS",
    "DE",
    "AON",
    "DUK",
    "CI",
    "CCI",
    "BKNG",
    "BK",
    "MSI",
    "SO",
    "BDX",
    "CME",
    "MU",
    "PLD",
    "USB",
    "GS",
  ]
