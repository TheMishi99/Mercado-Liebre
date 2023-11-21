const fs = require('fs');
const path = require("path");
const products = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, "../database/products.json")
    )
);
const productosController = {
    products: (req, res) => {
        let formProductSearch = req.query.search;
        res.render("products/products", {
            products,
            formProductSearch
        });
    },
    create: (req, res) => {
        let formProductSearch = req.query.search;
        let productName = req.body.productName;
        let productPrice = req.body.productPrice;
        let product = {
            id: products[products.length - 1].id + 1,
            name: productName,
            altName: productName,
            price: productPrice,
            image: "/none"
        }
        products.push(product);
        fs.writeFileSync(
            path.join(__dirname, "../database/products.json"), JSON.stringify(products)
        );

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