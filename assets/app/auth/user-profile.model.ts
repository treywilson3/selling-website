export class UserProfile {
  constructor(public email: string,
              public username?: string,
              public firstName?: string,
              public lastName?: string,
              public userId?: string) {
  }
}