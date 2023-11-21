const express = require('express');
const router = express.Router();

const usersController = require("../controllers/usersController");

router.get("/", usersController.users);

router.get("/login", usersController.login);
router.get("/register", usersController.register);

router.get("/create", usersController.createGET);
router.post("/create", usersController.createPOST);

router.get("/search", usersController.searchGET);

router.get("/:userID", usersController.user);

router.get("/:userID/edit", usersController.editGET);
router.put("/:userID/edit", usersController.editPUT);

router.get("/:userID/delete", usersController.deleteGET);
router.delete("/:userID/delete", usersController.deleteDELETE);


module.exports = router;