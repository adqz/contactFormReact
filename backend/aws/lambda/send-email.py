import json
import boto3

clientSES = boto3.client('ses')

def lambda_handler(event, context):
    # 1. Parse info
    try:
        body    = json.loads(event['body'])
        name    = body['name']
        toEmail = body['email']
        message = body['message']
    except KeyError:
        return {
            'statusCode': 501,
            'body': 'Argument(s) not found with keys namely "name", "email", "message" ',
        }
    except error:
        return {
            'statusCode': 500,
            'body': f'Server Error: {str(error)} ',
        }

    # 2. Form email
    source       = 'adnanqzs@gmail.com'
    subject      = f'{name}, your inquiry has been received by MKDecision'
    destination  = {'ToAddresses': [toEmail]}
    message_body = f'''Dear {name},\n \
        Your inquiry has been received. Someone from MKDecision will get back to you within 2-3 business days.\
For record keeping purpose, the following is the message you sent us: \n\n "{message}" '''
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
    # 3. Send Email
    try:
        response = clientSES.send_email(Source = source, Destination = destination, Message = message)
    except error:
        return {
            'statusCode': 500,
            'body': f'AWS SES Error: {str(error)} ',
        }

    responseStatus    = int(response['ResponseMetadata']['HTTPStatusCode'])
    responseRequestId = response['ResponseMetadata']['RequestId']
    
    # 4. Return status of request
    if responseStatus == 200:
        return {
            'statusCode': 200,
            'body': 'Information received succesfully. Email will be sent now',
        }
    else:
        return {
            'statusCode': 500,
            'body': f'Could not send email. To follow up, please note the RequestId: {responseRequestId}',
        }