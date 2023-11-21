const express = require('express');
const router = express.Router();

const productsController = require("../controllers/productsController");

router.get("/", productsController.products);

router.get("/create", productsController.createGET);
router.post("/create", productsController.createPOST);

router.get("/search", productsController.searchGET);

router.get("/:productID", productsController.product);

router.get("/:productID/edit", productsController.editGET);
router.put("/:productID/edit", productsController.editPUT);

router.get("/:productID/delete", productsController.deleteGET);
router.delete("/:productID/delete", productsController.deleteDELETE);

module.exports = router;