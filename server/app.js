require('dotenv').config()
require('express-async-errors')

// express
const express = require('express')
const app = express()

// rest of the packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// imports
const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// import routers
const authRouter = require('./routes/authRoutes')

// package middlewares
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(cors())

// routes
app.get('/', (req, res) => {
  res.json({ success: true, msg: 'Ecommerce API' })
})

app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies)
  res.json({ success: true, msg: 'Ecommerce API' })
})

app.use('/api/v1/auth', authRouter)

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
