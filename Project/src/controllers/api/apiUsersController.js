const db = require("../../database/models");
const apiUsersController = {
  list: async (req, res) => {
    try {
      const users = await db.Users.findAll({ include: ["interests"] });
      if (users) {
        const response = {
          status: 200,
          data: users,
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
        const response = {
          status: 200,
          data: user,
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
