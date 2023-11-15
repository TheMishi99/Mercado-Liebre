const path = require("path");
const mainController = {
    home: (req, res) => {
        res.sendFile(path.join(__dirname, "../", "views", "home.html"))
    },
    about: (req, res) => {
        res.send("IGUANA");
    }
};

module.exports = mainController;