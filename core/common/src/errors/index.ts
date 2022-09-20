export class BaseError extends Error {
  constructor(message: string, public readonly code: number) {
    super(message);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class BadParamError extends BaseError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnknownError extends BaseError {
  constructor(message = "发生了未知错误，请稍后再试") {
    super(message, 999);
  }
}
