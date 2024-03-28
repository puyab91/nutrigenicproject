export class ApiUrl {
  private static get baseUrl(): string {
    return 'https://nutrigenic.co.uk/api/';
  }

  static get basrUrl(): string {
    return this.baseUrl;
  }

  static get login(): string {
    return this.baseUrl + 'auth/login';
  }

}
