export const fetching = async (request) => {
  let result = {};

  try {
    const response = await fetch(request.url, {
      method: request.method,
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'x-api-key': 'd5G02nIFVaa9pXCs4t0oD1qxJzSbohXOaUfknYce',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: request.body ? JSON.stringify(request.body) : null
    });

    console.log('response: %o', response);

    switch (response.status) {
      case 200:
      case 201:
        result = response.json();
        console.log('response to result: %o', result);
        break;
      case 204:
        break;
      default:
        console.error('fetching no match status');
    }
  } catch (error) {
    console.error('fetching error: ', error);
  }

  return result;
};

export default {};
