const jwt = require("jsonwebtoken");
const { UnAuthenticatedError, ForbiddenError } = require("../errors");

const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    throw new UnAuthenticatedError("Authentication Failed!")
  }

  try {
    const { userId, role } = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId, role }
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid!")
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) throw new ForbiddenError("Not authorized to access this route!")
    next()
  }
}

module.exports = { authenticateUser, authorizePermissions };