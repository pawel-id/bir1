export class BirError extends Error {
  public response?: any

  constructor(message: string) {
    super(message)
  }

  static assert(response: any) {
    const { errorCode, errorMessageEn, errorMessagePl } = response
    if (errorCode || errorMessageEn || errorMessagePl) {
      const message =
        errorMessageEn || errorMessagePl || `BIR error code ${errorCode}`
      const error = new BirError(message)
      error.response = response
      throw error
    }
  }
}
