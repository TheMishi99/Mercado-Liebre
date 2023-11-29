const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const model = {
  usersPath: join(__dirname, "../database/users.json"),
  index: () => JSON.parse(readFileSync(model.usersPath)),
  findOne: (id) => model.index().find((user) => user.id == id),
  createOne: (user) => {
    const allUsers = model.index();
    user.id = Date.now();
    allUsers.push(user);
    writeFileSync(model.usersPath, JSON.stringify(allUsers));
  },
  modifyOne: (newUserData) => {
    const allUsers = model.index();
    const userIndex = allUsers.findIndex(
      (user) => user.id == newUserData.id
    );
    allUsers[userIndex].fullName = newUserData.fullName;
    allUsers[userIndex].userName = newUserData.userName;
    allUsers[userIndex].email = newUserData.email;
    allUsers[userIndex].birthDate = newUserData.birthDate;
    allUsers[userIndex].address = newUserData.address;
    allUsers[userIndex].profile = newUserData.profile;
    allUsers[userIndex].interests = newUserData.interests;
    allUsers[userIndex].password = newUserData.password;
    writeFileSync(model.usersPath, JSON.stringify(allUsers));
  },
  deleteOne: (id) => {
    const allUsers = model.index();
    const userToDelete_Index = allUsers.findIndex(
      (user) => user.id == id
    );
    allUsers.splice(userToDelete_Index, 1);
    writeFileSync(model.usersPath, JSON.stringify(allUsers));
  },
  searchUsers: (keywords) => {
    const allUsers = model.index();
    if (keywords != null) {
      return allUsers.filter((user) =>
        user.name.toLowerCase().includes(keywords.toLowerCase())
      );
    } else {
      return [];
    }
  },
};

module.exports = model;
