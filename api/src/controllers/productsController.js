const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const { Op } = require("sequelize");

const productosController = {
  products: async (req, res) => {
    try {
      const products = await db.Products.findAll();
      if (products) {
        return res.render("products/products", {
          products,
          userLoggedIn: req.session.userLoggedIn,
        });
      }
      throw new Error("Error al consultar la base de datos");
    } catch (error) {
      console.error(error.message);
    }
  },
  createGET: (req, res) => {
    return res.render("products/productCreate", {
      userLoggedIn: req.session.userLoggedIn,
    });
  },
  createPOST: async (req, res) => {
    try {
      let { name, price } = req.body;
      let image =
        "/images/products/" +
        ((req.file && req.file.filename) || "default.jpg");
      let product = {
        name,
        altName: name,
        price,
        image,
      };
      await db.Products.create(product);
      return res.redirect("/products");
    } catch (error) {
      console.error(error.message);
    }
  },
  searchGET: async (req, res) => {
    try {
      let keywords = req.query.search;
      const results = await db.Products.findAll({
        where: { [Op.like]: "%" + keywords + "%" },
      });
      if (results) {
        return res.render("products/productSearch", {
          results,
          userLoggedIn: req.session.userLoggedIn,
        });
      }
      throw new Error("Error al consultar la base de datos");
    } catch (error) {
      console.error(error.message);
    }
  },
  editGET: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await db.Products.findByPk(id);
      if (product) {
        return res.render("./products/productEdit", {
          product,
          userLoggedIn: req.session.userLoggedIn,
        });
      }
      throw new Error("No existe producto con el id: " + id);
    } catch (error) {
      console.error(error.message);
    }
  },
  editPUT: async (req, res) => {
    try {
      const id = req.params.id;
      const productInDb = await db.Products.findByPk(id);
      if (productInDb) {
        let { name, price } = req.body;
        let image;
        if (req.file) {
          image = "/images/products/" + req.file.filename;
          if (productInDb.image != "/images/products/default.jpg") {
            fs.unlinkSync(
              path.join(__dirname, "../../public", productInDb.image)
            );
          }
        } else {
          image = productInDb.image;
        }
        let product = {
          name,
          altName: name,
          price,
          image,
        };
        await db.Products.update(product, { where: { id } });
        return res.redirect("/products");
      }
      throw new Error("No existe producto con el id: " + id);
    } catch (error) {
      console.error(error.message);
    }
  },
  deleteDELETE: async (req, res) => {
    try {
      const id = req.params.id;
      await db.Products.destroy({ where: { id } });
      return res.redirect("/products");
    } catch (error) {
      console.error(error.message);
    }
  },
  productDetail: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await db.Products.findByPk(id);
      if (product) {
        return res.render("products/productDetail", {
          product,
          userLoggedIn: req.session.userLoggedIn,
        });
      }
      throw new Error("No existe producto con el id: " + id);
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = productosController;
