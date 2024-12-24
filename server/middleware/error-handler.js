const { statusCodes } = require('http-status-codes')
const { custom } = require('joi')

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default values
    statusCode: err.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong, please try again later',
  }

  // handle validation error
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')

    customError.statusCode = 400
  }

  // handle duplicate key error
  if (err.code && err.code === 11000) {
    customError.message = `Duplicate field value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`
    customError.statusCode = 400
  }

  // handle cast error
  if (err.name === 'CastError') {
    customError.message = `No item found with id of ${err.value}`
    customError.statusCode = 404
  }

  return res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
  })
}

module.exports = errorHandlerMiddleware
