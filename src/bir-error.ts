export default class BirError extends Error {
  public response?: any

  constructor(message: string) {
    super(message)

    // restore prototype chain
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-newtarget
    Object.setPrototypeOf(this, new.target.prototype)

    Error.captureStackTrace(this)
  }

  static fromResponse(response: any) {
    const message =
      response.errorMessageEn ||
      response.errorMessagePl ||
      `BIR error code ${response.errorCode}`
    const error = new BirError(message)
    error.response = response
    return error
  }

  static looksLike(response: any) {
    if(response.errorCode || response.errorMessageEn || response.errorMessagePl) {
      return true
    }
    return false
  }

}
