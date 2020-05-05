import ApiRequest from './ApiRequest';
import {fetching} from './fetch';

export default class ApiHandler {
  constructor() {
    console.log(`API_URL: ${API_URL}`);
    this.dummyData = [
      {
        id: 'dummy1',
        title: '더미 데이터 1',
        category: 'ongoing'
      },
      {
        id: 'dummy2',
        title: '더미 데이터 2',
        category: 'done'
      }
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  async getCards() {
    const request = new ApiRequest('GET', '/kanban/cards');
    const response = await fetching(request);

    return response.Items ?? null;
  }

  // eslint-disable-next-line class-methods-use-this
  async postCard(cardObj) {
    const request = new ApiRequest('POST', '/kanban/cards', {
      category: cardObj.category,
      title: cardObj.title
    });
    const response = await fetching(request);

    return response.id ?? null;
  }

  // eslint-disable-next-line class-methods-use-this
  async putCard(cardObj) {
    const request = new ApiRequest('PUT', `/kanban/cards/${cardObj.id}`, {
      category: cardObj.category,
      title: cardObj.title
    });

    await fetching(request);
  }

  // eslint-disable-next-line class-methods-use-this
  async deleteCard(id) {
    const request = new ApiRequest('DELETE', `/kanban/cards/${id}`);
    await fetching(request);
  }
}
