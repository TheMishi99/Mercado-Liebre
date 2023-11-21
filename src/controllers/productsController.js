const fs = require('fs');
const path = require("path");
const products = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, "../database/products.json")
    )
);
const productosController = {
    products: (req, res) => {
        res.render("products/products", {
            products,
        });
    },
    createGET: (req, res) => {
        res.render(
            "products/productCreate", {
        });
    },
    createPOST: (req, res) => {
        let productName = req.body.productName;
        let productPrice = req.body.productPrice;
        let product = {
            id: products[products.length - 1].id + 1,
            name: productName,
            altName: productName,
            price: productPrice,
            image: "/images/products/img-tv-samsung-smart.jpg"
        }
        products.push(product);
        fs.writeFileSync(
            path.join(__dirname, "../database/products.json"), JSON.stringify(products)
        );
        res.redirect("/products");
    },
    searchGET: (req, res) => {
        let formProductSearch = req.query.search;
        res.render("products/productSearch", {
            products,
            formProductSearch
        });
    },
    editGET: (req, res) => {
        const productID = req.params.productID;
        res.render("./products/productEdit", {
            products,
            productID
        })
    },
    editPUT: (req, res) => {
        let productID = req.body.productID;
        let newProductName = req.body.newProductName;
        let newProductPrice = req.body.newProductPrice;

        products[productID - 1].name = newProductName;
        products[productID - 1].price = newProductPrice;

        fs.writeFileSync(
            path.join(__dirname, "../database/products.json"), JSON.stringify(products)
        );
        res.redirect("/products");
    },
    deleteGET: (req, res) => {
        const productID = req.params.productID;
        res.render(
            "./products/productDelete", {
                products,
                productID
        })
    },
    deleteDELETE: (req, res) => {
        const productID = req.params.productID;
        console.log(productID);
        products.splice(productID - 1, 1);
        
        fs.writeFileSync(
            path.join(__dirname, "../database/products.json"), JSON.stringify(products)
        );
        res.redirect("/products");
    },
    product: (req, res) => {
        let productID = req.params.productID
        res.render("products/productDetail", {
            products,
            productID
        });
    }
};

module.exports = productosController;