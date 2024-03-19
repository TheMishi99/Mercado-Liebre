module.exports = (sequelize, datatypes) => {
  const alias = "Users";
  const cols = {
    id: {
      type: datatypes.BIGINT(100).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    profileImage: {
      type: datatypes.STRING(100),
      allowNull: false,
    },
    fullName: {
      type: datatypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: datatypes.STRING(100),
      allowNull: false,
    },
    birthDate: {
      type: datatypes.DATE(),
      allowNull: false,
    },
    address: {
      type: datatypes.STRING(100),
      allowNull: false,
    },
    profile: {
      type: datatypes.STRING(100),
      allowNull: false,
    },
    userName: {
      type: datatypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: datatypes.STRING(100),
      allowNull: false,
    },
  };
  const config = {
    tableName: "Users",
    timestamps: false,
  };
  const User = sequelize.define(alias, cols, config);

  return User;
};
