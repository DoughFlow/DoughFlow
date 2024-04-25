def extract_tickers(file, out_file):
    tickers = []
    with open(file, "r") as file:
        line = file.readline()
        while line:
            tick = line.split("\t")
            tickers.append(tick[1])
            line = file.readline()

    with open(out_file, "a") as file:
        for items in tickers:
            file.write(str(items) + '\n')
    print(f"Added {len(tickers)} tickers!")

def count_tickers(file):
    tickers = []
    with open(file, "r") as file:
        for lines in file:
            e = file.readline()
            tick = e.split("\t")
            tickers.append(tick[1])
    print(len(tickers))

def test_tickers(file):
    tickers = []
    with open(file, "r") as file:
        for lines in file:
            e = file.readline()
            tickers.append(e)
    print(len(tickers))
