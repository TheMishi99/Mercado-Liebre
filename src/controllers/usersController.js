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
    login: (req, res) => {
        res.render("./users/login");
    },
    register: (req, res) => {
        res.render("./users/register");
    },
    user: (req, res) => {
        const userID = req.params.userID;
        res.render("./users/userDetail", {
            users,
            userID
        })
    }
};

module.exports = usersController;