module.exports = (sequelize, dataTypes) => {
  let alias = "UsersInterests";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    interest_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Interest",
        key: "id",
      },
    },
  };
  let config = {
    tableName: "users_interests",
    timestamps: false,
  };
  const UserInterest = sequelize.define(alias, cols, config);

  UserInterest.associate = (models) => {
    UserInterest.belongsTo(models.Users, {
      as: "user",
      foreignKey: "user_id",
    });
    UserInterest.belongsTo(models.Interests, {
      as: "interest",
      foreignKey: "interest_id",
    });
  };

  return UserInterest;
};
