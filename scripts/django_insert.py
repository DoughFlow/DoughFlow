import os
import subprocess

def run_django_command(django_path, file_path):
    # Change directory to your Django project directory
    os.chdir(django_path)

    # Run the Django command using subprocess
    subprocess.call(['python3', 'manage.py', 'json_to_database', file_path])

if __name__ == "__main__":
    # Replace 'your_django_command_here' with the actual Django command you want to run
    run_django_command('your_django_command_here')


def run_django_mm(django_path):
    # Change directory to your Django project directory
    os.chdir(django_path)

    # Run the Django command using subprocess
    subprocess.call(['python3', 'manage.py', 'migrate'])

if __name__ == "__main__":
    # Replace 'your_django_command_here' with the actual Django command you want to run
    run_django_command('your_django_command_here')
