const HttpStatus = require('http-status-codes')
const bcrypt = require('bcrypt')
const { createTkn } = require('../utils')

exports.register = async (req, res) => {
  try {
    const existingUser = await req.db.User.findOne({ email: req.body.email })
    if (existingUser) {
      return res.status(HttpStatus.CONFLICT).json({
        success: false,
        message: 'User already exists!'
      })
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    const user = await req.db.User.create(req.body)
    const token = createTkn({ _id: user._id }, process.env.JWT_KEY)

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Successfully register',
      token
    })
  } catch (error) {
    console.error(error)
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something bad happened!'
    })
  }
}
exports.login = async (req, res) => {
  try {
    const user = await req.db.User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'User not found!'
      })
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Incorrect password!'
      })
    }

    const token = createTkn({ _id: user._id }, process.env.JWT_KEY)

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'successfully logged in',
      token
    })
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something bad happened!'
    })
  }
}
