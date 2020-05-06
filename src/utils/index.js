const jwt = require('jsonwebtoken')

exports.createTkn = (payload = {}, secret) => {
  payload['user:id'] = payload._id || null
  delete payload._id
  delete payload.password

  if (payload.exp === null) {
    delete payload.exp
    return jwt.sign(payload, secret)
  }

  if (payload.exp !== undefined || Number.isInteger(payload.exp)) {
    return jwt.sign(payload, secret)
  }

  return jwt.sign(payload, secret, { expiresIn: '7d' })
}

exports.decodeTkn = (token, secret) => jwt.verify(token, secret)
