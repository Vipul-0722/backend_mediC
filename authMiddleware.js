const jwt = require("jsonwebtoken")
const config = require("./config") // Store your JWT secret here

function authenticateToken(req, res, next) {
  const token = req.header("Authorization")
  if (!token) return res.status(401).send("Access denied")

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) return res.status(403).send("Invalid token")
    req.user = user
    next()
  })
}

module.exports = authenticateToken

