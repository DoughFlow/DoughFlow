import api_to_data as a
import django_insert as d
import django_compliance as c
import os
import time

# THIS FILE IS CURRENTLY SET TO NASDAQ

# Configure these for running insertions
doughflow_path='/home/cus/projects/bgdflow'
django_path=os.path.join(doughflow_path, 'django')
script_path=os.path.join(doughflow_path, 'scripts')
data_path=os.path.join(script_path, 'data')

api_keys = []
tickers = []
c_tickers = []

def start():
    # Set environ
    c.set_vars(django_path)
    os.chdir(script_path)
    
    # Retrieve keys
    with open('api_keys.txt', 'r') as keyfile:
        for line in keyfile:
            api_keys.append(line.strip())
    print(f"{len(api_keys)} key(s) loaded!")

    # Load all tickers and finished tickers
    with open('nasdaq.txt', 'r') as file:
        for line in file:
            tickers.insert(0, line.strip())
    print(tickers)

    with open('c_nasdaq.txt', 'r') as file:
        for line in file:
            c_tickers.append(line.strip())

    # Iterate non-completed tickers!
    for ticker in tickers:
        print(f"Using ticker: {ticker}")
        # Debug sleep
        #d.run_django_mm(django_path)
        #time.sleep(30)
        try:
            if ticker not in c_tickers:
                a.write_call(ticker, api_keys[0])
                file_path = os.path.join(data_path,f"{ticker}.json")
                d.run_django_command(django_path, file_path)
                os.chdir(script_path)
                with open('c_nasdaq.txt', 'a') as file:
                    file.write(str(ticker) + '\n')
                print("Results written to tracking file...")
                time.sleep(2)
            else:
                print(f"Ticker: {ticker} is already completed")
        except Exception as e:
            print(f"sum broke: {e}")
            break

if __name__=='__main__':
    start()
