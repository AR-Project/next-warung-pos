export interface IUserlogin {
  username: any
  password: any
}

export default class UserLogin {
  username: any
  password: any
  constructor (payload: IUserlogin) {
    this._verifyPayload(payload)

    this.username = payload.username
    this.password = payload.password
  }

  _verifyPayload (payload: IUserlogin): void {
    const { username, password } = payload

    if (username == null || password == null) {
      throw new Error('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      throw new Error('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}
