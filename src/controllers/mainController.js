const path = require("path");
const lastViewedProducts = require("../database/lastViewedProducts");
const onOfferProducts = require("../database/onOfferProducts");
const mainController = {
    redirect: (req, res) => {
        res.redirect("/home")
    },
    home: (req, res) => {
        res.render("home", {
            lastViewedProducts,
            onOfferProducts
        });
    },
    about: (req, res) => {
        res.render("about")
    }
};

module.exports = mainController;