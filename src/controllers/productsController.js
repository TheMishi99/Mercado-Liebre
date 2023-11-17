const path = require("path");
const productosController = {
    all: (req, res) => {
        let products = [
            {
                name: "Mishi",
                age: 20
            },
            {
                name: "Ely",
                age: 21
            }
        ];
        res.render("products", {
            products
        });
        res.render("products");
    },
    product: (req, res) => {
        const prodID = req.params.id
        res.send(`Estas en el producto ${prodID}`);
    }
};

module.exports = productosController;