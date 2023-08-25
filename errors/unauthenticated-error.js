const { StatusCodes } = require("http-status-codes")
const CustomApiError = require("./custom-api-error")

module.exports = class UnAuthenticatedError extends CustomApiError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}