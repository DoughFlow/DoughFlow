import os
import subprocess
django_path = '/home/ethanrohman/git_repos/DoughFlow/django'
data_path = '/home/ethanrohman/all_data/good_data'

def main():
    stocks = []
    with open('l2', 'r') as file:
        for line in file:
            stocks.append(line.strip())

    os.chdir(django_path)
    
    for item in stocks:
        filename = item + '.json'
        file_path = os.path.join(data_path,filename)
        subprocess.call(['python3', 'manage.py', 'json_to_database', file_path])

if __name__ == '__main__':
    main()
