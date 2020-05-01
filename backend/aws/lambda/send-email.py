import json
import boto3

clientSES = boto3.client('ses')

def lambda_handler(event, context):
    # 1. Parse info sent in
    # print('------------- START: DEBUG -------------')
    # print('type(event) = ', type(event))
    # print('event.keys() = ', event.keys())
    # print('------------- END: DEBUG -------------')
    
    name = event['queryStringParameters']['name']
    toEmail = event['queryStringParameters']['email']
    message = event['queryStringParameters']['message']
    print(f'name={name}, email={toEmail}, message={message}')

    # 2. Forming email
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
