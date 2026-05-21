class ApiError extends Errors {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badreq (message = "badRequest"){
    return new ApiError(400, message)
  }
  static unauthorized(message = "authorized"){
    return new ApiError(401, message)
  }
  static conflict(message="conflict"){
    return new ApiError(404, message)
  }
}

export { ApiError };
