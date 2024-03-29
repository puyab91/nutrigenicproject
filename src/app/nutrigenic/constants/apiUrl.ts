export class ApiUrl {
  private static get baseUrl(): string {
    // return 'https://admin.nutrigenic.co.uk/api';
    return 'https://92.205.191.225/api/';
  }

  static get basrUrl(): string {
    return this.baseUrl;
  }

  static get login(): string {
    return this.baseUrl + 'auth/login';
  }

  static get signup(): string {
    return this.baseUrl + 'auth/signup';
  }

}
