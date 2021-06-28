
export class CodeError extends Error {
  private code?: string

  constructor(message: string, code?: string) {
    super(message)
    this.code = code
  }
}

// . Accessibility errors
export class PublicError extends CodeError {
  public internalMessage: string

  constructor(publicMessage: string, internalMessage?: string, code?: string) {
    super(publicMessage, code)
    this.internalMessage = internalMessage || publicMessage
  }
}
export class InternalError extends CodeError {}


// . Status errors
export class ValidationError extends PublicError {}
export class PermissionDeniedError extends PublicError {}
export class NotFoundError extends PublicError {}
