import finnhub
import json
from datetime import datetime, timedelta

# Configure your Finnhub API key
api_key = "cotb5t9r01qgacnd6bogcotb5t9r01qgacnd6bp0"
finnhub_client = finnhub.Client(api_key=api_key)

# Helper function to format date
def format_date(date):
    return date.strftime("%Y-%m-%d")

# Function to fetch IPO data using the Finnhub client
def fetch_ipo_data():
    start_date = datetime.strptime("2019-05-05", "%Y-%m-%d")
    today_date = datetime.now()
    delta = timedelta(days=200)

    all_ipo_data = []

    while start_date < today_date:
        end_date = start_date + delta
        if end_date > today_date:
            end_date = today_date

        # Fetch IPO calendar data for the date range
        ipo_data = finnhub_client.ipo_calendar(_from=format_date(start_date), to=format_date(end_date))
        all_ipo_data.extend(ipo_data['ipoCalendar'])

        # Move start_date to the day after end_date
        start_date = end_date + timedelta(days=1)

    # Write data to a file
    with open('ipo.json', 'w') as f:
        json.dump(all_ipo_data, f, indent=4)

    print(f"Total IPOs fetched: {len(all_ipo_data)}")

# Run the function to fetch and save IPO data
if __name__ == "__main__":
    fetch_ipo_data()

