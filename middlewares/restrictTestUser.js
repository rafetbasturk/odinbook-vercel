const { BadRequestError } = require("../errors")

const restrictTestUser = async (req, res, next) => {
  if (req.user.userId === "64177d66b41acfe6c3624bb5") {
    throw new BadRequestError("Read Only! Test User. Please register.")
  }
  next()
}

module.exports = restrictTestUser