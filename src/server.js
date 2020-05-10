const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const HttpStatus = require('http-status-codes')
const helmet = require('helmet')
const db = require('./models')
const mongoose = require('mongoose')
const router = require('./routes')

const server = async () => {
  const app = express()

  await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  app.use(cors())
  app.use(helmet())
  app.use(compression())
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use((req, res, next) => {
    req.db = db
    next()
  })
  app.use('/', router)

  app.use((req, res) => {
    return res
      .status(HttpStatus.NOT_FOUND)
      .send({ message: `Route ${req.url} Not found.` })
  })

  app.use((error, req, res) => {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error })
  })

  return app
}

module.exports = server
