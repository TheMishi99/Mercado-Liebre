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
    loginGET: (req, res) => {
        res.render("./users/login");
    },
    loginPOST: (req, res) => {
        let userName = req.body.userName;
        let userPassword = req.body.userPassword;
        let user = users.find(user => user.userName == userName);
        let verified = false;
        if(user != null){
            if(user.userPassword == userPassword){
                verified = true;
            }
        }
        if(verified){
            res.redirect("/home");
        }else{
            res.redirect("/users/login");
        }


    },
    registerGET: (req, res) => {
        res.render("./users/register");
    },
    registerPOST: (req, res) => {
        let userFullName = req.body.userFullName;
        let userName = req.body.userName;
        let userEmail = req.body.userEmail;
        let userBirthDate = req.body.userBirthDate;
        let userAddress = req.body.userAddress;
        let userProfile = req.body.userProfile;
        let userInterest = [];
        if(req.body.userInterest){
            userInterest = req.body.userInterest;
        }
        let userProfileImage = req.file.filename;
        let userPassword = req.body.userPassword;
        let userPasswordConfirmation = req.body.userPasswordConfirmation;
        if(userPassword == userPasswordConfirmation){
            let newUser = {
                userID: users[users.length - 1].userID + 1,
                userFullName,
                userName,
                userEmail,
                userBirthDate,
                userAddress,
                userProfile,
                userInterest,
                userProfileImage,
                userPassword,
                userPasswordConfirmation
            }
            users.push(newUser);
            fs.writeFileSync(
                path.join(__dirname, "../database/users.json"), JSON.stringify(users)
            );
            res.redirect("/users/login");
        }else{
            res.redirect("/users/register");
        }
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