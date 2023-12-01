const fs = require("fs");
const path = require("path");

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
    });
  },
  loginGET: (req, res) => {
    res.render("./users/login");
  },
  loginPOST: (req, res) => {
    let userName = req.body.userName;
    let userPassword = req.body.userPassword;
    let user = users.find((user) => user.userName == userName);
    let verified = false;
    if (user != null) {
      if (user.userPassword == userPassword) {
        verified = true;
      }
    }
    if (verified) {
      res.redirect("/home");
    } else {
      res.redirect("/users/login");
    }
  },
  registerGET: (req, res) => {
    res.render("./users/register");
  },
  registerPOST: (req, res) => {
    let interests;
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
  },
  searchGET: (req, res) => {
    let keywords = req.query.search;
    res.render("./users/userSearch", {
      results: searchUsers(keywords),
    });
  },
  editGET: (req, res) => {
    const user = findOne(req.params.id);
    res.render("./users/userEdit", {
      user,
    });
  },
  editPUT: (req, res) => {
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
        interests = req.body.interests;
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
  },
  deleteGET: (req, res) => {
    const user = findOne(req.params.id);
    res.render("./users/userDelete", {
      user,
    });
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
    });
  },
};

module.exports = usersController;
