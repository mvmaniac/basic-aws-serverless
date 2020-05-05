const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10'
});

const TABLE_NAME = 'Cards';

exports.handler = async (event, context, callback) => {
  console.log(`Received event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Received context: ${JSON.stringify(context, null, 2)}`);
  console.log(`Received callback: ${JSON.stringify(callback, null, 2)}`);

  let response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };

  try {
    // API Gateway에 설정한 pathParameter
    const {id} = event.pathParameters;

    const params = {
      TableName: TABLE_NAME,
      Key: {id}
    };

    await documentClient.delete(params).promise();
  } catch (error) {
    console.error(error);

    response = {
      ...response,
      statusCode: 500,
      body: JSON.stringify({message: error})
    };
  }

  return response;
};
