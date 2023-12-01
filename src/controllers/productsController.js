const fs = require("fs");
const path = require("path");

const {
  index,
  findOne,
  createOne,
  modifyOne,
  deleteOne,
  searchProducts,
} = require("../models/product.model");

const productosController = {
  products: (req, res) => {
    res.render("products/products", {
      products: index(),
    });
  },
  createGET: (req, res) => {
    res.render("products/productCreate");
  },
  createPOST: (req, res) => {
    let { name, price } = req.body;
    let image;
    if (req.file) {
      image = req.file;
      image = "/images/products/" + image.filename;
    } else {
      image = "/images/products/default.jpg";
    }
    let product = {
      id: 0,
      name,
      altName: name,
      price,
      image,
    };
    createOne(product);
    res.redirect("/products");
  },
  searchGET: (req, res) => {
    let keywords = req.query.search;
    res.render("products/productSearch", {
      results: searchProducts(keywords),
    });
  },
  editGET: (req, res) => {
    let product = findOne(req.params.id);
    res.render("./products/productEdit", {
      product,
    });
  },
  editPUT: (req, res) => {
    let image;
    if (req.file) {
      image = req.file;
    } else {
      image = findOne(req.body.id).image;
    }
    let product = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      image,
    };
    modifyOne(product);
    res.redirect("/products");
  },
  deleteDELETE: (req, res) => {
    let id = req.params.id;
    deleteOne(id);
    res.redirect("/products");
  },
  product: (req, res) => {
    let product = findOne(req.params.id);
    res.render("products/productDetail", {
      product,
    });
  },
};

module.exports = productosController;
