import os

def set_vars(django_path):
    os.chdir(django_path)
    with open('.secrets', 'r') as file:
        for line in file:
            vals = line.strip().split('=')
            # Has varname and value
            if len(vals) == 2:
                var, val = vals[0], vals[1]
                os.environ[var] = val
