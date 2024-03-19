const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");

/* Multer Configuration */
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationFolder = path.join(
      __dirname,
      "../../public/images/products"
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

/* AuthMiddleware */
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", productsController.products);

router.get("/create", authMiddleware, productsController.createGET);
router.post("/create", uploadFile.single("img"), productsController.createPOST);

router.get("/search", productsController.searchGET);

router.get("/:id", productsController.product);

router.get("/:id/edit", authMiddleware, productsController.editGET);
router.put("/:id/edit", uploadFile.single("img"), productsController.editPUT);

router.delete("/:id", productsController.deleteDELETE);

module.exports = router;
