const db = require("../../database/models");
const apiProductsController = {
  list: async (req, res) => {
    try {
      const products = await db.Products.findAll();
      if (products) {
        const newProductsArray = products.map((product) => {
          const { id, image, name, altName, price } = product;
          return {
            id,
            image,
            name,
            altName,
            price,
            detailUrl: "/api/products/" + id,
          };
        });
        const response = {
          status: 200,
          data: newProductsArray,
          url: "/api/products",
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
      const product = await db.Products.findByPk(id);
      if (product) {
        const { id, image, name, altName, price } = product;
        const newProduct = {
          id,
          image,
          name,
          altName,
          price,
        };
        const response = {
          status: 200,
          data: newProduct,
          url: "/api/products/" + id,
        };
        return res.json(response);
      }
      throw new Error("No existe producto con el id: " + id);
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = apiProductsController;
