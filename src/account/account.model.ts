// interface AccountType {
// id: number;
// device_token: string,
// password: string,
// type: string
// }
export class AccountModel {
  constructor(
    public id: number,
    public device_token: string,
    public password: string,
    public type: string,
  ) {}
}
