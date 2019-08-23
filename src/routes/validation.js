const joi = require("@hapi/joi")

const schemaPost = {
  sujetId: joi
    .string()
    .trim()
    .required(),
  userName: joi
    .string()
    .trim()
    .required(),
  description: joi
    .string()
    .trim()
    .required()
}

const schemaRegister = {
  username: joi
    .string()
    .trim()
    .min(2)
    .required(),
  email: joi
    .string()
    .trim()
    .min(2)
    .email()
    .required(),
  password: joi
    .string()
    .trim()
    .min(6)
    .required()
}
//
const schemaLogin = {
  email: joi
    .string()
    .trim()
    .min(2)
    .email()
    .required(),
  password: joi
    .string()
    .trim()
    .min(6)
    .required()
}

//
const schemaSujet = {
  name: joi
    .string()
    .trim()
    .required(),
  description: joi
    .string()
    .trim()
    .required()
}

//
function validationRegister(data) {
  return joi.validate(data, schemaRegister)
}

//
function validationLogin(data) {
  return joi.validate(data, schemaLogin)
}

//
function validationSujet(data) {
  return joi.validate(data, schemaSujet)
}

//
function validationPost(data) {
  return joi.validate(data, schemaPost)
}

//
module.exports = {
  validationRegister,
  validationLogin,
  validationSujet,
  validationPost
}
