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
const isLoggedMiddleware = require("../middlewares/isLoggedMiddleware");

router.get("/", productsController.products);

router.get(
  "/create",
  isLoggedMiddleware,
  authMiddleware,
  productsController.createGET
);
router.post(
  "/create",
  isLoggedMiddleware,
  authMiddleware,
  uploadFile.single("img"),
  productsController.createPOST
);

router.get("/search", productsController.searchGET);

router.get("/:id", productsController.productDetail);

router.get(
  "/:id/edit",
  isLoggedMiddleware,
  authMiddleware,
  productsController.editGET
);
router.put(
  "/:id/edit",
  isLoggedMiddleware,
  authMiddleware,
  uploadFile.single("img"),
  productsController.editPUT
);

router.delete(
  "/:id",
  isLoggedMiddleware,
  authMiddleware,
  productsController.deleteDELETE
);

module.exports = router;
