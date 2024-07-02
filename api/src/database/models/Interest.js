module.exports = (sequelize, dataTypes) => {
  let alias = "Interests";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  };
  let config = {
    tableName: "interests",
    timestamps: false,
  };
  const Interest = sequelize.define(alias, cols, config);

  Interest.associate = (models) => {
    Interest.belongsToMany(models.Users, {
      as: "users",
      through: "UsersInterests",
      foreignKey: "interest_id",
      otherKey: "user_id",
      timestamps: false,
    });
  };

  return Interest;
};
