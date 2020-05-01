import json
import boto3

clientSES = boto3.client('ses')
clientDB  = boto3.client('dynamodb')

def lambda_handler(event, context):
    # 1. Parse info    
    name = event['queryStringParameters']['name']
    toEmail = event['queryStringParameters']['email']
    message = event['queryStringParameters']['message']

    # 2. Email
    subject = f'{name}, your inquiry has been received by MKDecision'
    message_body = f'''Dear {name},\n
    Your inquiry has been received. Someone from MKDecision will get back to you within 2-3 business days.
    For record keeping purpose, the following is the message you sent us: \n {message} '''
    destination = {
        'ToAddresses': [toEmail],
    }
    message = {
        'Subject': {
            'Data': subject,
            'Charset': 'UTF-8',
        },
        'Body': {
            'Text': {
                'Data': message_body,
                'Charset': 'UTF-8',
            },
        },
    }
    response = clientSES.send_email(Source = 'adnanqzs@gmail.com', Destination = destination, Message = message)
    print('------------- START: DEBUG -------------')
    print('type(response) = ', type(response))
    print('response.keys() = ', response.keys())
    print('------------- END: DEBUG -------------')
    apiResponse = {
        'name': name,
        'email': toEmail,
        'reply': 'Name and email received succesfully. Email will be sent now'
    }
    
    apiResponseObject = {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json.dumps(apiResponse)
    }
    
    return apiResponseObject
