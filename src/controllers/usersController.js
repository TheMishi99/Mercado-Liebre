const fs = require('fs');
const path = require("path");

const { index, findOne, createOne, modifyOne, deleteOne, searchUsers } = require("../models/user.model");

const usersController = {
    users: (req, res) => {
        res.render("./users/users", {
            users: index()
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
        let { fullName, userName, email, birthDate, address, profile, interests, password, passwordConfirmation } = req.body;
        let img = req.file;
        if(!req.body.userInterest){
            userInterest = [];
        }
        if(password == passwordConfirmation){
            let newUser = {
                id: 0,
                fullName,
                userName,
                email,
                birthDate,
                address,
                profile,
                interests,
                profileImage: "/images/usersAvatars/" + img.filename,
                password,
                passwordConfirmation
            }
            createOne(newUser);
            res.redirect("/users/login");
        }else{
            res.redirect("/users/register");
        }
    },
    searchGET: (req, res) => {
        let keywords = req.query.search;
        res.render("./users/userSearch", {
            results: searchUsers(keywords)
        })
    },
    editGET: (req, res) => {
        const user = findOne(req.params.id);
        res.render("./users/userEdit", {
            user
        })
    },
    editPUT: (req, res) => {
        let { fullName, userName, email, birthDate, address, profile, interests, password, passwordConfirmation } = req.body;
        let img = req.file;

        if(password == passwordConfirmation){
            let newUser = {
                id: req.body.id,
                fullName,
                userName,
                email,
                birthDate,
                address,
                profile,
                interests,
                profileImage: "/images/usersAvatars/" + img.filename,
                password,
                passwordConfirmation
            }
            modifyOne(newUser);
            res.redirect("/users/login");
        }else{
            res.redirect("/users/register");
        }
    },
    deleteGET: (req, res) => {
        const user = findOne(req.params.id);
        res.render(
            "./users/userDelete", {
                user
        })
    },
    deleteDELETE: (req, res) => {
        const userId = req.params.id;
        deleteOne(userId);
        res.redirect("/users");
    },
    user: (req, res) => {
        const user = findOne(req.params.id);
        res.render("./users/userDetail", {
            user
        })
    }
};

module.exports = usersController;