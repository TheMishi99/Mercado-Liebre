const express = require('express');
const router = express.Router();

const usersController = require("../controllers/usersController");

router.get("/", usersController.users);
router.post("/", usersController.create);

router.get("/login", usersController.login);
router.get("/register", usersController.register);
router.get("/:userID", usersController.user);

module.exports = router;