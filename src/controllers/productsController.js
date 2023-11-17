const path = require("path");
const products = require("../database/products");
const productosController = {
    all: (req, res) => {
        res.render("products", {
            products
        });
    },
    product: (req, res) => {
        const prodID = req.params.id
        res.send(`Estas en el producto ${prodID}`);
    }
};

module.exports = productosController;