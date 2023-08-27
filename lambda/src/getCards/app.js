const AWSXRay = require('aws-xray-sdk');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

const documentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
});

const TABLE_NAME = 'Cards';

exports.handler = async (event, context, callback) => {
  const segment = AWSXRay.getSegment();
  const subsegment = segment.addNewSubsegment('kanban-lambda');

  subsegment.addAnnotation('App', 'kanban-lambda-getCards');

  console.log(`Received event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Received context: ${JSON.stringify(context, null, 2)}`);
  console.log(`Received callback: ${JSON.stringify(callback, null, 2)}`);

  let response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  let params = {};

  try {
    params = {
      TableName: TABLE_NAME,
    };

    const cards = await documentClient.scan(params).promise();

    // statusCode, body 속성은 API Gateway 응답 본문 형식으로 맞춰야 함
    // 그리고 response를 API Gateway 응답으로 바로 내려주면 'Lambda 프록시 통합 사용'을 체크해야 함
    // 안그러면 API Gateway 에서 맵핑 같은 설정작업이 필요함 (어떤 데이터를 내려줄것인지 등)
    response = {
      ...response,
      body: JSON.stringify(cards),
    };
  } catch (error) {
    console.error(error);

    response = {
      ...response,
      statusCode: 500,
      body: JSON.stringify({message: '서버 에러'}),
    };

    subsegment.addMetadata('Exception', error.stack.toString());
    subsegment.addMetadata('Event', event);
    subsegment.addMetadata('DB Params', params);
    subsegment.close(error);
  }

  subsegment.close();
  return response;
};
