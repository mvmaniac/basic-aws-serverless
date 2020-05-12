const AWSXRay = require('aws-xray-sdk');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

const documentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10'
});

const TABLE_NAME = 'Cards';

exports.handler = async (event, context, callback) => {
  const segment = AWSXRay.getSegment();
  const subsegment = segment.addNewSubsegment('kanban-lambda');

  subsegment.addAnnotation('App', 'kanban-lambda-postCard');

  console.log(`Received event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Received context: ${JSON.stringify(context, null, 2)}`);
  console.log(`Received callback: ${JSON.stringify(callback, null, 2)}`);

  let response = {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };

  let params = {};

  try {
    // 별도의 ID를 생성하는 대신 API Gateway에서 제공하는 requestId를 사용함
    const id = event.requestContext.requestId;

    // API Gateway 를 통해서 들어온 요청 본문 값
    const body = JSON.parse(event.body);

    params = {
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

    subsegment.addMetadata('Exception', error.stack.toString());
    subsegment.addMetadata('Event', event);
    subsegment.addMetadata('DB Params', params);
    subsegment.close(error);
  }

  subsegment.close();
  return response;
};
