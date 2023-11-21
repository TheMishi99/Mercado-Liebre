const fs = require('fs');
const path = require("path");
const users = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, "../database/users.json")
    )
);
const usersController = {
    users: (req, res) => {
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
    create: (req, res) => {
        let formUserSearch = req.query.search;
        let userName = req.body.userName;
        let userPassword = req.body.userPassword;
        let user = {
            id: users[users.length - 1].id + 1,
            name: userName,
            password: userPassword
        }
        users.push(user);
        fs.writeFileSync(
            path.join(__dirname, "../database/users.json"), JSON.stringify(users)
        );

        res.render("users/users", {
            users,
            formUserSearch
        });

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