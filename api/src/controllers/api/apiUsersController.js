const db = require("../../database/models");
const apiUsersController = {
  list: async (req, res) => {
    try {
      const users = await db.Users.findAll({ include: ["interests"] });
      if (users) {
        const newUsersArray = users.map((user) => {
          const {
            id,
            profileImage,
            fullName,
            email,
            birthDate,
            address,
            profile,
            userName,
            password,
            authLevel,
          } = user;
          const interests = user.interests.map((interest) => {
            return { id: interest.id, name: interest.name };
          });
          return {
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
            authLevel,
            detailUrl: "/api/users" + id,
          };
        });
        const response = {
          status: 200,
          data: newUsersArray,
          url: "/api/users",
        };
        return res.json(response);
      }
      throw new Error("Error al consultar la base de datos");
    } catch (error) {
      console.error(error.message);
    }
  },
  detail: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await db.Users.findByPk(id, { include: ["interests"] });
      if (user) {
        const {
          id,
          profileImage,
          fullName,
          email,
          birthDate,
          address,
          profile,
          userName,
          password,
          authLevel,
        } = user;
        const interests = user.interests.map((interest) => {
          return { id: interest.id, name: interest.name };
        });
        const newUser = {
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
          authLevel,
        };
        const response = {
          status: 200,
          data: newUser,
          url: "/api/users/" + id,
        };
        return res.json(response);
      }
      throw new Error("No existe usuario con el id: " + id);
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = apiUsersController;
