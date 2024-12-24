require('dotenv').config()

// express
const express = require('express')
const app = express()

// database
const connectDB = require('./db/connect')

// port
const port = process.env.PORT || 3001

// server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
