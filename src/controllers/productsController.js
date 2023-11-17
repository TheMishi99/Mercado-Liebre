const path = require("path");
const products = require("../database/products");
const productosController = {
    all: (req, res) => {
        let formProductSearch = req.query.search;
        res.render("products/products", {
            products,
            formProductSearch
        });
    },
    product: (req, res) => {
        let productID = req.params.productID
        res.render("products/productDetail", {
            products,
            productID
        });
    }
};

module.exports = productosController;