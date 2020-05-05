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
    // 별도의 ID를 생성하는 대신 API Gateway에서 제공하는 requestId를 사용함
    const id = event.requestContext.requestId;

    // API Gateway 를 통해서 들어온 요청 본문 값
    const body = JSON.parse(event.body);

    const params = {
      TableName: TABLE_NAME,
      Item: {
        // HashKey 이름을 id로 지정함
        id,
        category: body.category,
        title: body.title
      }
    };

    await documentClient.put(params).promise();

    response = {
      ...response,
      body: JSON.stringify({id})
    };
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
