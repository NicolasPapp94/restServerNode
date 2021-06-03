const validation = require('./validation.middleware');
const JWTValidation = require('./jwt-validation.middleware');
const validaRoles = require('./role-validation.middleware');
const fileValidation = require('./file-validation.middleware')



module.exports = {
  ...validation,
  ...JWTValidation,
  ...validaRoles,
  ...fileValidation
}