const path = require("path");
const products = require("../database/products");
const productosController = {
    all: (req, res) => {
        res.render("products/products", {
            products
        });
    },
    product: (req, res) => {
        let prodID = req.params.productID
        res.render("products/productDetail", {
            products,
            prodID
        });
    }
};

module.exports = productosController;