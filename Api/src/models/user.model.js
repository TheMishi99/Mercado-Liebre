const { readFileSync, writeFileSync, unlinkSync } = require("fs");
const { join } = require("path");

const model = {
  usersPath: join(__dirname, "../database/users.json"),
  index: () => JSON.parse(readFileSync(model.usersPath)),
  findOne: (id) => model.index().find((user) => user.id == id),
  createOne: (user) => {
    const allUsers = model.index();
    user.id = Date.now();
    allUsers.push(user);
    writeFileSync(model.usersPath, JSON.stringify(allUsers, null, 2));
  },
  modifyOne: (newUserData) => {
    const allUsers = model.index();
    const userIndex = allUsers.findIndex((user) => user.id == newUserData.id);
    if (allUsers[userIndex].profileImage != newUserData.profileImage) {
      if (
        allUsers[userIndex].profileImage != "/images/usersAvatars/default.jpg"
      ) {
        try {
          unlinkSync(
            join(__dirname, "../../public", allUsers[userIndex].profileImage)
          );
          console.log("File removed");
        } catch (err) {
          console.error("Something wrong happened removing the file", err);
        }
      }
    }
    allUsers[userIndex] = newUserData;
    writeFileSync(model.usersPath, JSON.stringify(allUsers, null, 2));
  },
  deleteOne: (id) => {
    const allUsers = model.index();
    const userToDelete_Index = allUsers.findIndex((user) => user.id == id);
    if (
      allUsers[userToDelete_Index].profileImage !=
      "/images/usersAvatars/default.jpg"
    ) {
      try {
        unlinkSync(
          join(
            __dirname,
            "../../public",
            allUsers[userToDelete_Index].profileImage
          )
        );
        console.log("File removed");
      } catch (err) {
        console.error("Something wrong happened removing the file", err);
      }
    }
    allUsers.splice(userToDelete_Index, 1);
    writeFileSync(model.usersPath, JSON.stringify(allUsers, null, 2));
  },
  searchUsers: (keywords) => {
    const allUsers = model.index();
    if (keywords != null) {
      return allUsers.filter((user) =>
        user.userName.toLowerCase().includes(keywords.toLowerCase())
      );
    } else {
      return [];
    }
  },
};

module.exports = model;
