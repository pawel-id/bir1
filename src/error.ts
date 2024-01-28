export class BirError extends Error {
  public response?: any

  constructor(message: string) {
    super(message)
  }

  static assert(response: any) {
    const { ErrorCode, ErrorMessageEn, ErrorMessagePl } = response
    if (ErrorCode || ErrorMessageEn || ErrorMessagePl) {
      const message =
        ErrorMessageEn || ErrorMessagePl || `BIR error code ${ErrorCode}`
      const error = new BirError(message)
      error.response = response
      throw error
    }
  }
}
