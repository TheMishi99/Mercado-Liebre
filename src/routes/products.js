const express = require('express');
const router = express.Router();

const productsController = require("../controllers/productsController");

router.get("/", productsController.products);
router.post("/", productsController.create);

router.get("/:productID", productsController.product);

module.exports = router;