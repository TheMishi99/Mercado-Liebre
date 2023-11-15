const express = require('express');
const router = express.Router();

const productsController = require("../controllers/productsController");

router.get("/", productsController.all);
router.get("/:id", productsController.product);

module.exports = router;