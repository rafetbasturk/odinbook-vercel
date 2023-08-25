const BadRequestError = require("./bad-request-error")
const NotFoundError = require("./not-found-error")
const UnAuthenticatedError = require("./unauthenticated-error")
const ForbiddenError = require("./forbidden-error")

module.exports = {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
  ForbiddenError
}