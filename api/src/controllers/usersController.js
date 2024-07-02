const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

const db = require("../database/models");
const { Op } = require("sequelize");
const usersController = {
  users: async (req, res) => {
    try {
      const users = await db.Users.findAll({ include: ["interests"] });
      if (users) {
        return res.render("./users/users", {
          users,
          userLoggedIn: req.session.userLoggedIn,
        });
      }
      throw new Error("Error al consultar la base de datos");
    } catch (error) {
      console.error(error.message);
    }
  },
  loginGET: (req, res) => {
    return res.render("./users/login", {
      userLoggedIn: req.session.userLoggedIn,
    });
  },
  loginPOST: async (req, res) => {
    try {
      const errores = validationResult(req);
      if (errores.isEmpty()) {
        let { userName, password } = req.body;
        const user = await db.Users.findOne({
          where: {
            userName,
          },
          include: ["interests"],
        });
        if (user) {
          if (bcryptjs.compareSync(password, user.password)) {
            req.session.userLoggedIn = user;
            return res.redirect("/home");
          } else {
            return res.redirect("/users/login");
          }
        }
        throw new Error("El usuario no existe");
      } else {
        return res.render("./users/login", {
          errors: errores.mapped(),
          oldData: req.body,
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  },
  logout: (req, res) => {
    req.session.userLoggedIn = undefined;
    return res.redirect("/home");
  },
  registerGET: async (req, res) => {
    try {
      const interests = await db.Interests.findAll();
      if (interests) {
        return res.render("./users/register", {
          userLoggedIn: req.session.userLoggedIn,
          interests,
        });
      }
      throw new Error("Error al consultar la base de datos");
    } catch (error) {
      console.error(error.message);
    }
  },
  registerPOST: async (req, res) => {
    try {
      const errores = validationResult(req);
      if (errores.isEmpty()) {
        let { email, userName } = req.body;
        let userInDb = await db.Users.findOne({
          where: { email },
          include: ["interests"],
        });
        if (!userInDb) {
          userInDb = await db.Users.findOne({
            where: { userName },
            include: ["interests"],
          });
          if (!userInDb) {
            let { password, passwordConfirmation } = req.body;
            if (password == passwordConfirmation) {
              let { fullName, birthDate, address, profile } = req.body;
              let interests = req.body.interests
                ? Array.isArray(req.body.interests)
                  ? req.body.interests
                  : [req.body.interests]
                : [];
              let profileImage =
                "/images/usersAvatars/" +
                ((req.file && req.file.filename) || "default.jpg");
              let user = {
                profileImage,
                fullName,
                email,
                birthDate,
                address,
                profile,
                userName,
                password: bcryptjs.hashSync(password, 10),
                authLevel: 2,
              };
              db.sequelize
                .transaction(async (t) => {
                  let newUserInDb = await db.Users.create(user, {
                    transaction: t,
                  });
                  for (let interest of interests) {
                    const interestInDb = await db.Interests.findByPk(interest, {
                      include: ["users"],
                    });
                    await db.UsersInterests.create(
                      { user_id: newUserInDb.id, interest_id: interestInDb.id },
                      { transaction: t }
                    );
                  }
                })
                .then(() => {
                  return res.redirect("/users/login");
                });
            }
            throw new Error("Las contraseñas no coinciden");
          }
          throw new Error("Ya existe un usuario con ese nombre de usuario");
        }
        throw new Error("Ya existe un usuario asociado a ese e-mail");
      } else {
        return res.render("./users/register", {
          errors: errores.mapped(),
          oldData: req.body,
          userLoggedIn: req.session.userLoggedIn,
          interests,
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  },
  searchGET: async (req, res) => {
    try {
      let keywords = req.query.search;
      const results = await db.Users.findAll({
        where: {
          userName: {
            [Op.like]: "%" + keywords + "%",
          },
        },
        include: ["interests"],
      });
      return res.render("./users/userSearch", {
        results: results || [],
        userLoggedIn: req.session.userLoggedIn,
      });
    } catch (error) {
      console.error(error.message);
    }
  },
  editGET: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await db.Users.findByPk(id, {
        include: ["interests"],
      });
      if (user) {
        const interests = await db.Interests.findAll();
        if (interests) {
          return res.render("./users/userEdit", {
            user: user,
            userLoggedIn: req.session.userLoggedIn,
            interests,
          });
        }
        throw new Error("Error al consultar la base de datos");
      }
      throw new Error("No existe el usuario con id: " + id);
    } catch (error) {
      console.error(error.message);
    }
  },
  editPUT: async (req, res) => {
    try {
      const errores = validationResult(req);
      if (errores.isEmpty()) {
        const userInDb = await db.Users.findByPk(id, {
          include: ["interests"],
        });
        if (userInDb) {
          let id = req.params.id;
          let { password, passwordConfirmation } = req.body;
          if (password == passwordConfirmation) {
            let { fullName, email, birthDate, address, profile, userName } =
              req.body;
            let interests = req.body.interests
              ? Array.isArray(req.body.interests)
                ? req.body.interests
                : [req.body.interests]
              : [];
            let profileImage;
            if (req.file) {
              profileImage = "/images/usersAvatars/" + req.file.filename;
              if (userInDb.profileImage != "/images/usersAvatars/default.jpg") {
                fs.unlinkSync(
                  path.join(__dirname, "../../public", userInDb.profileImage)
                );
              }
            } else {
              profileImage = userInDb.profileImage;
            }
            let user = {
              profileImage,
              fullName,
              email,
              birthDate,
              address,
              profile,
              userName,
              password: bcryptjs.hashSync(password, 10),
            };
            await db.sequelize.transaction(async (t) => {
              await db.Users.update(user, { where: { id }, transaction: t });
              for (let interest of interests) {
                if (
                  !userInDb.interests.map((int) => int.id).includes(interest.id)
                ) {
                  await db.UsersInterests.create({}, { transaction: t });
                }
              }
            });
            return res.redirect("/users/" + user.id);
          } else {
            return res.redirect("/users/" + user.id + "/edit");
          }
        }
        throw new Error("No existe el usuario con id: " + id);
      } else {
        const user = findOne(req.params.id);
        return res.render("./users/userEdit", {
          errors: errores.mapped(),
          oldData: req.body,
          user,
          interests,
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  },
  deleteDELETE: async (req, res) => {
    try {
      const id = req.params.id;
      await db.Users.destroy({ where: { id } });
    } catch (error) {
      console.error(error.message);
    }
    return res.redirect("/users");
  },
  userDetail: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await db.Users.findByPk(id, {
        include: ["interests"],
      });
      if (user) {
        return res.render("./users/userDetail", {
          user,
          userLoggedIn: req.session.userLoggedIn,
        });
      }
      throw new Error("No existe el usuario con id: " + id);
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = usersController;
