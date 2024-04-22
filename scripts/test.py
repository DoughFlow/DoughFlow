import os
import subprocess

def run_django_command(filename):
    # Change directory to your Django project directory
    os.chdir('/home/cus/projects/doughflow/django')

    # Run the Django command using subprocess
    subprocess.call(['python3', 'manage.py', 'json_to_database', filename])

if __name__ == "__main__":
    # Replace 'your_django_command_here' with the actual Django command you want to run
    run_django_command('your_django_command_here')

