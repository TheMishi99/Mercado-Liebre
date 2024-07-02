const db = require("../database/models");

const mainController = {
  redirect: (req, res) => {
    return res.redirect("/home");
  },
  home: async (req, res) => {
    try {
      const allProducts = await db.Products.findAll();
      const lastProducts = await db.Products.findAll({
        order: [["id", "DESC"]],
      });
      return res.render("home", {
        lastProducts,
        allProducts,
        userLoggedIn: req.session.userLoggedIn,
      });
    } catch (error) {
      console.error(error.message);
    }
  },
  about: (req, res) => {
    return res.render("about", {
      userLoggedIn: req.session.userLoggedIn,
    });
  },
};

module.exports = mainController;
