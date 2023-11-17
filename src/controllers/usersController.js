const path = require("path");
const users = require("../database/users");
const usersController = {
    all: (req, res) => {
        let formUserSearch = req.query.search;
        res.render("./users/users", {
            users,
            formUserSearch
        });
    },
    user: (req, res) => {
        res.render("./users/user", {
            users,
            userID: req.params.userID
        })
    },
    login: (req, res) => {
        res.render("./users/login");
    },
    register: (req, res) => {
        res.render("./users/register");
    }
};

module.exports = usersController;