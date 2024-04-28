import json

def clean(filename):
    with open(filename, 'r') as file:
        jstring = json.load(file)
    
    vals = jstring['values']
    unique = list({ each['datetime'] : each for each in vals }.values())
    jstring['values'] = unique

    with open(filename, 'w') as file:
        json.dump(jstring, file, indent=4)
