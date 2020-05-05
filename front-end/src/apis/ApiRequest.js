export default class ApiRequest {
  constructor(method, path, body = null) {
    this.method = method;
    this.url = API_URL + path;
    this.body = body;
  }
}
