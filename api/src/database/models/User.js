module.exports = (sequelize, dataTypes) => {
  let alias = "Users";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    profileImage: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    address: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    profile: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    authLevel: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };
  let config = {
    tableName: "users",
    timestamps: false,
  };
  const User = sequelize.define(alias, cols, config);

  User.associate = (models) => {
    User.belongsToMany(models.Interests, {
      as: "interests",
      through: "UsersInterests",
      foreignKey: "user_id",
      otherKey: "interest_id",
      timestamps: false,
    });
  };

  return User;
};
