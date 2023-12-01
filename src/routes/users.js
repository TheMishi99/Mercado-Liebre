const express = require("express");
const router = express.Router();

/* Multer Configuration */
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationFolder = path.join(
      __dirname,
      "../../public/images/usersAvatars"
    );
    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    const newFileName = "img-" + Date.now() + "-" + file.originalname;
    cb(null, newFileName);
  },
});
const uploadFile = multer({
  storage,
});
/* Multer Configuration */

/* Express-Validator */
// const { body } = require("express-validator");
// const validateRegisterForm = [
//   body("fullName")
//     .notEmpty()
//     .withMessage("Debes completar el campo de Nombre y Apellido"),
//   body("userName")
//     .notEmpty()
//     .withMessage("Debes completar el campo de Nombre de Usuario"),
//   body("email").isEmail().withMessage("Debe ser un email valido"),
//   body("email").notEmpty().withMessage("Debes completar el campo de email"),
//   body("birthDate")
//     .isDate({ format: "dd-mm-yyyy" })
//     .withMessage("Debe ser una fecha valida"),
//   body("birthDate")
//     .notEmpty()
//     .withMessage("Debes completar el campo de Fecha de Nacimiento"),
//   body("address")
//     .notEmpty()
//     .withMessage("Debes completar el campo de Domicilio"),
//   body("profileImage")
//     .notEmpty()
//     .withMessage("Debes subir un archivo para el campo de Foto de Perfil"),
//   body("password")
//     .isLength({min:8, max:14})
//     .withMessage("La contraseña debe ser de entre 8 y 14 caracteres"),
//   body("passwordConfirmation")
//     .notEmpty()
//     .withMessage("Debes completar el campo de Confirmar Contraseña"),
// ];
/* Express-Validator */

const usersController = require("../controllers/usersController");

router.get("/", usersController.users);

router.get("/login", usersController.loginGET);
router.post("/login", usersController.loginPOST);

router.get("/register", usersController.registerGET);
router.post(
  "/register",
  uploadFile.single("profileImage"),
  usersController.registerPOST
);

router.get("/search", usersController.searchGET);

router.get("/:id", usersController.user);

router.get("/:id/edit", usersController.editGET);
router.put(
  "/:id/edit",
  uploadFile.single("profileImage"),
  usersController.editPUT
);
router.delete("/:id/", usersController.deleteDELETE);

module.exports = router;
