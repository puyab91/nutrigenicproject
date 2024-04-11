export class ApiUrl {
  private static get baseUrl(): string {
    return 'https://admin.nutrigenic.co.uk/api/';
    //  return 'https://92.205.191.225/api/';
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

  static get loginWithGoogle(): string {
    return this.baseUrl + 'auth/google';
  }

  static get activate(): string {
    return this.baseUrl + 'auth/activate';
  }

  static get userProfile(): string {
    return this.baseUrl + 'profile';
  }

  static get setWeight(): string {
    return this.baseUrl + 'biometrics/weight';
  }

  static get setImc(): string {
    return this.baseUrl + 'biometrics/imc';
  }

  static get setPicture(): string {
    return this.baseUrl + 'biometrics/photo';
  }

  static get setBlood(): string {
    return this.baseUrl + 'biometrics/blood';
  }

  static get biometrics(): string {
    return this.baseUrl + 'biometrics';
  }

  static get blogs(): string {
    return this.baseUrl + 'articles';
  }

  static get meals(): string {
    return this.baseUrl + 'public/meals';
  }

  static get publicExperts(): string {
    return this.baseUrl + 'public/experts';
  }

  static get userExpert(): string {
    return this.baseUrl + 'user/expert';
  }

  static get experts(): string {
    return this.baseUrl + 'experts';
  }

  static get vitamins(): string {
    return this.baseUrl + 'store/vitamins';
  }

  static get fineSupplements(): string {
    return this.baseUrl + 'store/fine_supplements';
  }

  static get healthBoostIngredients(): string {
    return this.baseUrl + 'store/health_boost_ingredients';
  }

  static get snacks(): string {
    return this.baseUrl + 'store/snacks';
  }

  static get userOrders(): string {
    return this.baseUrl + 'orders/show';
  }

  static get userCreditCards(): string {
    return this.baseUrl + 'credit_cards';
  }
}
