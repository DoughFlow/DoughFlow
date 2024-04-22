def write_ticker(file):
    with open(file, "r") as file:
        for lines in file:
            e = file.readline()
            tick = e.split("\t")
            print(tick[1])
