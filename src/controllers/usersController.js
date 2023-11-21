const fs = require('fs');
const path = require("path");
const users = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, "../database/users.json")
    )
);
const usersController = {
    users: (req, res) => {
        res.render("./users/users", {
            users
        });
    },
    login: (req, res) => {
        res.render("./users/login");
    },
    register: (req, res) => {
        res.render("./users/register");
    },
    createGET: (req, res) => {
        res.render("./users/userCreate");
    },
    createPOST: (req, res) => {
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

        res.redirect("/users");
    },
    searchGET: (req, res) => {
        let formUserSearch = req.query.search;
        res.render("./users/userSearch", {
            users,
            formUserSearch
        })
    },
    editGET: (req, res) => {
        const userID = req.params.userID;
        res.render("./users/userEdit", {
            users,
            userID
        })
    },
    editPUT: (req, res) => {
        let userID = req.body.userID;
        let newUserName = req.body.newUserName;
        let newUserPassword = req.body.newUserPassword;

        users[userID - 1].name = newUserName;
        users[userID - 1].password = newUserPassword;

        fs.writeFileSync(
            path.join(__dirname, "../database/users.json"), JSON.stringify(users)
        );
        res.redirect("/users");
    },
    deleteGET: (req, res) => {
        const userID = req.params.userID;
        res.render(
            "./users/userDelete", {
                users,
                userID
        })
    },
    deleteDELETE: (req, res) => {
        const userID = req.params.userID;
        users.splice(userID - 1, 1);
        
        fs.writeFileSync(
            path.join(__dirname, "../database/users.json"), JSON.stringify(users)
        );
        res.redirect("/users");
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