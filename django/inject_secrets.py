# Except dependency error for better verbosity
try:
    import os
    import json
    import boto3
    import sys
 
    print("All Modules loaded ...", __name__)
 
except Exception as e:
    raise ("Some Modules are Missing :{} ".format(e))

# Truncate argv to remove path parameter
args = sys.argv[1:]

print("Key information loaded...")
 
global AWS_ACCESS_KEY
global AWS_SECRET_KEY
global AWS_REGION_NAME
global SECRET_NAME
global FUNCTION_CALLS

# Assign keys from shell script stdin
AWS_ACCESS_KEY = args[0]
AWS_SECRET_KEY = args[1]
AWS_REGION_NAME = "us-east-2"
SECRET_NAME = args[2]
FUNCTION_CALLS = dict()

class SecretsManager(object):
 
    __slots__ = ["_session", "client"]
     
    def __init__(self):
        self._session = boto3.session.Session()
        self.client =  self. _session.client(
            service_name='secretsmanager',
            aws_access_key_id=AWS_ACCESS_KEY,
            aws_secret_access_key=AWS_SECRET_KEY,
            region_name=AWS_REGION_NAME
        )
 
    def get_secrets(self):
        try:
            if SECRET_NAME== '':raise Exception("Secret Name cannot be Null ")
            get_secret_value_response = self.client.get_secret_value(
                SecretId=SECRET_NAME)
            
            if 'SecretString' in get_secret_value_response:
                secret = get_secret_value_response['SecretString']
                secret = json.loads(secret)
                '''
                local testing call
                for key, value in secret.items():os.environ[key] = val
                return secret
                '''
                # set environment variables for Django
                FUNCTION_CALLS['POSTGRES_DB'] = secret['dbname']
                FUNCTION_CALLS['POSTGRES_USER'] = secret['username']
                FUNCTION_CALLS['POSTGRES_PASSWORD'] = secret['password']
                FUNCTION_CALLS['POSTGRES_HOST'] = secret['host']

        except Exception as e:
            raise Exception('Information invalid') from e
 
secret_manager = SecretsManager()
print('Fetching Secrets... ', end='')
secret_manager.get_secrets()
print('Done')

# Iterate over FUNCTION_CALLS and print to stdout
for key, value in FUNCTION_CALLS.items():
    print(f"{key}={value}")

