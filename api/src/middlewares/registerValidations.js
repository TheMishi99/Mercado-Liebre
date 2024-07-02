const { body } = require("express-validator");

const validations = [
  body("fullName")
    .notEmpty()
    .withMessage("Debes completar el campo de Nombre y Apellido")
    .bail(),
  body("userName")
    .notEmpty()
    .withMessage("Debes completar el campo de Nombre de Usuario")
    .bail(),
  body("email")
    .notEmpty()
    .withMessage("Debes completar el campo de email")
    .bail()
    .isEmail()
    .withMessage("Debe ser un email valido")
    .bail(),
  body("birthDate")
    .notEmpty()
    .withMessage("Debes completar el campo de Fecha de Nacimiento")
    .bail()
    .isISO8601()
    .withMessage("Debe ser una fecha valida")
    .bail(),
  body("address")
    .notEmpty()
    .withMessage("Debes completar el campo de Domicilio")
    .bail(),
  body("profile")
    .notEmpty()
    .withMessage("Debes elegir una opcion para el Perfil de Usuario")
    .bail(),
  body("password")
    .notEmpty()
    .withMessage("Debes completar el campo de Contraseña")
    .bail()
    .isLength({ min: 8, max: 15 })
    .withMessage("La contraseña debe ser de entre 8 y 15 caracteres")
    .bail(),
  body("passwordConfirmation")
    .notEmpty()
    .withMessage("Debes completar el campo de Confirmar Contraseña")
    .bail()
    .isLength({ min: 8, max: 15 })
    .withMessage("La contraseña debe ser de entre 8 y 15 caracteres")
    .bail(),
];

module.exports = validations;
