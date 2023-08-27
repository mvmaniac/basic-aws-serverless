const AWSXRay = require('aws-xray-sdk');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

const documentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
});

const TABLE_NAME = 'Cards';

exports.handler = async (event, context, callback) => {
  const segment = AWSXRay.getSegment();
  const subsegment = segment.addNewSubsegment('kanban-lambda');

  subsegment.addAnnotation('App', 'kanban-lambda-putCard');

  console.log(`Received event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Received context: ${JSON.stringify(context, null, 2)}`);
  console.log(`Received callback: ${JSON.stringify(callback, null, 2)}`);

  let response = {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  let params = {};

  try {
    // API Gateway에 설정한 pathParameter
    const {id} = event.pathParameters;
    const body = JSON.parse(event.body);

    params = {
      TableName: TABLE_NAME,
      Key: {id},
      UpdateExpression: 'set #c = :c, #t = :t',
      ExpressionAttributeNames: {
        '#c': 'category',
        '#t': 'title',
      },
      ExpressionAttributeValues: {
        ':c': body.category,
        ':t': body.title,
      },
    };

    await documentClient.update(params).promise();
  } catch (error) {
    console.error(error);

    response = {
      ...response,
      statusCode: 500,
      body: JSON.stringify({message: error}),
    };

    subsegment.addMetadata('Exception', error.stack.toString());
    subsegment.addMetadata('Event', event);
    subsegment.addMetadata('DB Params', params);
    subsegment.close(error);
  }

  subsegment.close();
  return response;
};
