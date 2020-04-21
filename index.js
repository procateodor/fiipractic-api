const dotenv = require('dotenv')
const path = require('path')

const ENV = process.env.NODE_ENV === 'prod' ? 'prod' : 'dev'

dotenv.config({
  path: path.join(__dirname, `.env.${ENV}`)
})

const server = require('./src/server')

const PORT = process.env.PORT || 3000

server().then(app => {
  app.listen(PORT, () => console.log(`App is listening on ${PORT}`))
})
