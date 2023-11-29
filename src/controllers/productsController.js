const fs = require('fs');
const path = require("path");

const { index, findOne, createOne, modifyOne, deleteOne, searchProducts } = require("../models/product.model");

const productosController = {
    products: (req, res) => {
        res.render("products/products", {
            products: index()
        });
    },
    createGET: (req, res) => {
        res.render("products/productCreate");
    },
    createPOST: (req, res) => {
        let name = req.body.name;
        let price = req.body.price;
        let img = req.file;
        let product = {
            id: 0,
            name,
            altName: name,
            price,
            image: "/images/products/" + img.filename
        }
        createOne(product);
        res.redirect("/products");
    },
    searchGET: (req, res) => {
        let keywords = req.query.search;
        res.render("products/productSearch", {
            results: searchProducts(keywords)
        });
    },
    editGET: (req, res) => {
        let product = findOne(req.query.productID);
        res.render("./products/productEdit", {
            product
        })
    },
    editPUT: (req, res) => {
        let product = {
            id: req.body.productID,
            name: req.body.newProductName,
            price: req.body.newProductPrice
        }
        modifyOne(product);
        res.redirect("/products");
    },
    deleteGET: (req, res) => {
        let product = findOne(req.params.productID);
        res.render(
            "./products/productDelete", {
                product
        })
    },
    deleteDELETE: (req, res) => {
        let productID = req.params.productID;
        deleteOne(productID);
        res.redirect("/products");
    },
    product: (req, res) => {
        let product = findOne(req.params.productID)
        res.render("products/productDetail", {
            product
        });
    }
};

module.exports = productosController;