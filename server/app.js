require('dotenv').config()
require('express-async-errors')

// express
const express = require('express')
const app = express()

// rest of the packages
const morgan = require('morgan')

// imports
const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// package middlewares
app.use(morgan('tiny'))
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.json({ success: true, msg: 'Ecommerce API' })
})

// error middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// port
const port = process.env.PORT || 3001
// server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL) // connect to db
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
