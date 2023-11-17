const path = require("path");
const users = require("../database/users");
const usersController = {
    show: (req, res) => {
        res.render("users", {
            users
        });
    },
    login: (req, res) => {
        res.render("login");
    },
    register: (req, res) => {
        res.render("register");
    }
};

module.exports = usersController;