const path = require("path");
const usersController = {
    show: (req, res) => {
        let users = [
            {
                name: "Mishi",
                age: 20
            },
            {
                name: "Ely",
                age: 21
            }
        ];
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