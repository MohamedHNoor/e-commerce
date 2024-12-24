const jwt = require('jsonwebtoken')

// create JWT
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
  return token
}

// check if token is valid
const isTokenValid = ({ token }) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

// attach cookies to response
const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user })

  const oneDay = 1000 * 60 * 60 * 24

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  })
}

module.exports = { createJWT, isTokenValid, attachCookiesToResponse }