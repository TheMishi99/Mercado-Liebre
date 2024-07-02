module.exports = (sequelize, dataTypes) => {
  let alias = "Products";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    altName: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  };
  let config = {
    tableName: "products",
    timestamps: false,
  };
  const Product = sequelize.define(alias, cols, config);

  // Product.associate = (models) => {
  //   Product.belongsToMany(models.Interests, {
  //     as: "interests",
  //     through: "UsersInterests",
  //     foreignKey: "user_id",
  //     otherKey: "interest_id",
  //     timestamps: false,
  //   });
  // };

  return Product;
};
