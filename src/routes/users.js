const path = require('path');
const express = require('express');
const router = express.Router();

/* MULTER Configuration */
const multer = require('multer');
const multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder = path.join(__dirname, "../../public/images/profile-imgs");
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        let fileName = Date.now() + path.extname(file.originalname);
        callback(null, fileName);
    }
});
const fileUpload = multer({
    storage: multerDiskStorage
})


const usersController = require("../controllers/usersController");

router.get("/", usersController.users);

router.get("/login", usersController.loginGET);
router.post("/login", usersController.loginPOST);

router.get("/register", usersController.registerGET);
router.post("/register", fileUpload.single("userProfileImage"), usersController.registerPOST);

router.get("/search", usersController.searchGET);

router.get("/:userID", usersController.user);

router.get("/:userID/edit", usersController.editGET);
router.put("/:userID/edit", usersController.editPUT);

router.get("/:userID/delete", usersController.deleteGET);
router.delete("/:userID/delete", usersController.deleteDELETE);


module.exports = router;