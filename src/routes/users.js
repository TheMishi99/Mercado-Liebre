const express = require('express');
const router = express.Router();

/* Multer Configuration */
const path = require("path")
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationFolder = path.join(__dirname, "../../public/images/usersAvatars");
        cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
        const newFileName = "img-" + Date.now() + "-" + file.originalname;
        cb(null, newFileName);
    }
});
const uploadFile = multer({
    storage
})
/* Multer Configuration */


const usersController = require("../controllers/usersController");

router.get("/", usersController.users);

router.get("/login", usersController.loginGET);
router.post("/login", usersController.loginPOST);

router.get("/register", usersController.registerGET);
router.post("/register", uploadFile.single("userProfileImage"), usersController.registerPOST);

router.get("/search", usersController.searchGET);

router.get("/:id", usersController.user);

router.get("/:id/edit", usersController.editGET);
router.put("/:id/edit", uploadFile.single("userProfileImage"), usersController.editPUT);

router.get("/:id/delete", usersController.deleteGET);
router.delete("/:id/delete", usersController.deleteDELETE);


module.exports = router;