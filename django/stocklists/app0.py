import os
import subprocess
django_path = '/home/marcus/C/proj/DoughFlow/django'
data_path = '/home/marcus/C/proj/DoughFlow/django/mock_data'

def main():
    stocks = []
    with open('l0', 'r') as file:
        for line in file:
            stocks.append(line.strip())

    os.chdir(django_path)
    
    for item in stocks:
        filename = item + '.json'
        file_path = os.path.join(data_path,filename)
        subprocess.call(['python3', 'manage.py', 'json_to_database', file_path])

if __name__ == '__main__':
    main()
