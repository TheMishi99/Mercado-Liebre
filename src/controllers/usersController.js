const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

const {
  index,
  findOne,
  createOne,
  modifyOne,
  deleteOne,
  searchUsers,
} = require("../models/user.model");

const usersController = {
  users: (req, res) => {
    res.render("./users/users", {
      users: index(),
      userLoggedIn: req.session.userLoggedIn
    });
  },
  loginGET: (req, res) => {
    res.render("./users/login", {
      userLoggedIn: req.session.userLoggedIn
    });
  },
  loginPOST: (req, res) => {
    const errores = validationResult(req);
    if(errores.isEmpty()){
      const users = index();
      let { userName, password } = req.body;
      let user = users.find((user) => user.userName == userName);
      let verified = false;
      if (user != null) {
        if (user.password == password) {
          verified = true;
          req.session.userLoggedIn = user;
        }
      }
      if (verified) {
        res.redirect("/home");
      }else{
        res.redirect("/users/login");
      }
    }else{
      res.render("./users/login", {errors: errores.mapped(), oldData: req.body});
    }
  },
  logout: (req, res) => {
    req.session.userLoggedIn = undefined
    res.redirect("/home");
  },
  registerGET: (req, res) => {
    res.render("./users/register", {
      userLoggedIn: req.session.userLoggedIn
    });
  },
  registerPOST: (req, res) => {
    const errores = validationResult(req);
    if(errores.isEmpty()){
      let {
        fullName,
        email,
        birthDate,
        address,
        profile,
        userName,
        password,
        passwordConfirmation,
      } = req.body;
      let interests;
      if (password == passwordConfirmation) {
        if(req.body.interests){
          interests = req.body.interests;
        }else{
          interests = [];
        }
        let profileImage;
        if (req.file) {
          profileImage = req.file;
          profileImage = "/images/usersAvatars/" + profileImage.filename;
        } else {
          profileImage = "/images/usersAvatars/default.jpg";
        }
        let user = {
          id: 0,
          profileImage,
          fullName,
          email,
          birthDate,
          address,
          profile,
          interests,
          userName,
          password,
        };
        createOne(user);
        res.redirect("/users");
      } else {
        res.redirect("/users/register");
      }
    }else{
      res.render("./users/register", {errors: errores.mapped(), oldData: req.body});
    }
  },
  searchGET: (req, res) => {
    let keywords = req.query.search;
    res.render("./users/userSearch", {
      results: searchUsers(keywords),
      userLoggedIn: req.session.userLoggedIn
    });
  },
  editGET: (req, res) => {
    const user = findOne(req.params.id);
    res.render("./users/userEdit", {
      user,
      userLoggedIn: req.session.userLoggedIn
    });
  },
  editPUT: (req, res) => {
    const errores = validationResult(req);
    if(errores.isEmpty()){
      let id = req.params.id;
      let {
        fullName,
        email,
        birthDate,
        address,
        profile,
        interests,
        userName,
        password,
        passwordConfirmation,
      } = req.body;
      if (password == passwordConfirmation) {
        if(req.body.interests){
          if(Array.isArray(req.body.interests.length)){
            interests = req.body.interests;
          }else{
            interests = [];
            interests.push(req.body.interests);
          }
        }else{
          interests = [];
        }
        let profileImage;
        if (req.file) {
          profileImage = req.file;
          profileImage = "/images/usersAvatars/" + profileImage.filename;
        } else {
          profileImage = findOne(id).profileImage;
        }
        let user = {
          id,
          profileImage,
          fullName,
          email,
          birthDate,
          address,
          profile,
          interests,
          userName,
          password,
        };
        modifyOne(user);
        res.redirect("/users/" + user.id);
      } else {
        res.redirect("/users/" + user.id + "/edit");
      }
    }else{
      const user = findOne(req.params.id);
      res.render("./users/userEdit", {errors: errores.mapped(), oldData: req.body, user});
    }
  },
  deleteDELETE: (req, res) => {
    const userId = req.params.id;
    deleteOne(userId);
    res.redirect("/users");
  },
  user: (req, res) => {
    const user = findOne(req.params.id);
    res.render("./users/userDetail", {
      user,
      userLoggedIn: req.session.userLoggedIn
    });
  },
};

module.exports = usersController;
