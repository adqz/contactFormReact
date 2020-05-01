import json
import boto3

clientSES = boto3.client('ses')

def lambda_handler(event, context):
    # 1. Parse info sent in
    print('------------- START: DEBUG -------------')
    print('type(event) = ', type(event))
    print('event.keys() = ', event.keys())
    print('------------- END: DEBUG -------------')
    
    name = event['queryStringParameters']['name']
    toEmail = event['queryStringParameters']['email']
    message = event['queryStringParameters']['message']
    
    print(f'name={name}, email={toEmail}, message={message}')
    # 2. Construct body of response object
    apiResponse = {
        'name': name,
        'email': toEmail,
        'reply': 'Name and email received succesfully. Email will be sent now'
    }
    # 3. Construct response object
    apiResponseObject = {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json.dumps(apiResponse)
    }
    
    return apiResponseObject
