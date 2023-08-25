const { UnAuthenticatedError } = require("../errors")

const checkPermissions = (reqUser, resUser) => {
  if (reqUser.userId === resUser._id.toString()) return
  if (reqUser.role === "admin") return
  throw new UnAuthenticatedError("Not authorized!")
}

module.exports = checkPermissions