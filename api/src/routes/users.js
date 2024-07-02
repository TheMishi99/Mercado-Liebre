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

/* Middlewares */
const authMiddleware = require("../middlewares/authMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const isLoggedMiddleware = require("../middlewares/isLoggedMiddleware");
/* Middlewares */

const usersController = require("../controllers/usersController");

router.get("/", isLoggedMiddleware, authMiddleware, usersController.users);

router.get("/login", guestMiddleware, usersController.loginGET);
router.post(
  "/login",
  guestMiddleware,
  loginValidations,
  usersController.loginPOST
);

router.get("/logout", isLoggedMiddleware, usersController.logout);

router.get("/register", guestMiddleware, usersController.registerGET);
router.post(
  "/register",
  guestMiddleware,
  uploadFile.single("profileImage"),
  registerValidations,
  usersController.registerPOST
);

router.get(
  "/search",
  isLoggedMiddleware,
  authMiddleware,
  usersController.searchGET
);

router.get(
  "/:id",
  isLoggedMiddleware,
  authMiddleware,
  usersController.userDetail
);

router.get(
  "/:id/edit",
  isLoggedMiddleware,
  authMiddleware,
  usersController.editGET
);
router.put(
  "/:id/edit",
  isLoggedMiddleware,
  authMiddleware,
  uploadFile.single("profileImage"),
  registerValidations,
  usersController.editPUT
);
router.delete(
  "/:id/",
  isLoggedMiddleware,
  authMiddleware,
  usersController.deleteDELETE
);

module.exports = router;
