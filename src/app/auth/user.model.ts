export class User{
  constructor(public id: string,
              public email: string,
              private _token: string,
              private tokenExpirationDate: Date) {

}

  static createEmptyUser() {
    return new User('', '', '', new Date(0));
  }
get token() {
  if(!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
    return null;
  }

  return this._token;
}
}
