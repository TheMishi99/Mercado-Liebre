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

/* Validations */
const loginValidations = require("../middlewares/loginValidations");
const registerValidations = require("../middlewares/registerValidations");
/* Validations */

const usersController = require("../controllers/usersController");

router.get("/", usersController.users);

router.get("/login", usersController.loginGET);
router.post("/login", loginValidations, usersController.loginPOST);

router.get("/register", usersController.registerGET);
router.post(
  "/register",
  uploadFile.single("profileImage"),
  registerValidations,
  usersController.registerPOST
);

router.get("/search", usersController.searchGET);

router.get("/:id", usersController.user);

router.get("/:id/edit", usersController.editGET);
router.put(
  "/:id/edit",
  uploadFile.single("profileImage"),
  registerValidations,
  usersController.editPUT
);
router.delete("/:id/", usersController.deleteDELETE);

module.exports = router;
