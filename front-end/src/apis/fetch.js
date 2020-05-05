export const fetching = async (request) => {
  try {
    const response = await fetch(request.url, {
      method: request.method,
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: request.body ? JSON.stringify(request.body) : null
    });

    const result = await response.json();

    console.log('response: %o', response);
    console.log('response to result: %o', result);

    switch (response.status) {
      case 200:
        return result.Items;
      default:
        console.error('fetching status: ', result);
    }
  } catch (error) {
    console.error('fetching error: ', error);
  }

  return {};
};

export default {};
