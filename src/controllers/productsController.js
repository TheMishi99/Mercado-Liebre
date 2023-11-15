const path = require("path");
const productosController = {
    all: (req, res) => {
        res.sendFile(path.join(__dirname, "../", "views", "products.html"))
    },
    product: (req, res) => {
        const prodID = req.params.id
        res.send(`Estas en el producto ${prodID}`);
    }
};

module.exports = productosController;