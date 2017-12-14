export class RegisterUserModel {
  constructor  (
    public username: string = '',
    public firstName: string = '',
    public lastName: string = '',
    public password: string = ''
  ) { }
}