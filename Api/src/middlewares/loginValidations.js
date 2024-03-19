const { body } = require("express-validator");

const validations = [
  body("userName")
    .notEmpty()
    .withMessage("Debes completar el campo Nombre de Usuario")
    .bail(),
  body("password")
    .notEmpty()
    .withMessage("Debes completar el campo Contraseña")
    .bail()
];

module.exports = validations;
