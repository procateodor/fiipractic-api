const Joi = require('@hapi/joi')

const changePassword = Joi.object({
  oldPass: Joi.string().min(6).required(),
  newPass: Joi.string().min(6).required()
})

const updateUser = Joi.object({
  firstname: Joi.string().optional(),
  lastname: Joi.string().optional()
})

const resetPassword = Joi.object({
  password: Joi.string().min(6).required()
})

module.exports = { changePassword, updateUser, resetPassword }
