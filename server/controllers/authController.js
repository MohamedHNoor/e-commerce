const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../errors')
const { createTokenUser, attachCookiesToResponse } = require('../utils')

// register users
const register = async (req, res) => {
  const { email, name, password } = req.body
  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new CustomAPIError.BadRequestError('Email already exists')
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'

  const user = await User.create({ name, email, password, role })

  // create token
  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.CREATED).json({ success: true, user: tokenUser })
}

// login users
const login = async (req, res) => {
  const { email, password } = req.body
  // check if email and password are provided
  if (!email || !password) {
    throw new CustomAPIError.BadRequestError(
      'Please provide email and password'
    )
  }
  // find user check if it exists
  const user = await User.findOne({ email })

  if (!user) {
    throw new CustomAPIError.UnauthenticatedError('Invalid credentials')
  }

  // check if password matches
  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new CustomAPIError.UnauthenticatedError('Invalid credentials')
  }

  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.OK).json({ success: true, user: tokenUser })
}

// logout users
const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ success: true, msg: 'user logged out' })
}

module.exports = {
  register,
  login,
  logout,
}
