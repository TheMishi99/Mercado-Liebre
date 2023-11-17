const path = require("path");
const mainController = {
    home: (req, res) => {
        let lastViewedProducts = [
            {
                name: "Cafetera Moulinex",
                price: "6.770",
                image: "/images/products/img-cafetera-moulinex.jpg"
            },
            {
                name: "MacBook Pro 2019",
                price: "230.000",
                image: "/images/products/img-macbook-pro-2019.jpg"
            },
            {
                name: "Samsung Galaxy S10",
                price: "70.500",
                image: "/images/products/img-samsung-galaxy-s10.jpg"
            },
            {
                name: "SmartTv Samsung 43",
                price: "23.200",
                image: "/images/products/img-tv-samsung-smart.jpg"
            }
        ];
        let onOfferProducts = [
            {
                name: "Cafetera Moulinex",
                price: "6.770",
                image: "/images/products/img-cafetera-moulinex.jpg"
            },
            {
                name: "MacBook Pro 2019",
                price: "230.000",
                image: "/images/products/img-macbook-pro-2019.jpg"
            },
            {
                name: "Samsung Galaxy S10",
                price: "70.500",
                image: "/images/products/img-samsung-galaxy-s10.jpg"
            },
            {
                name: "SmartTv Samsung 43",
                price: "23.200",
                image: "/images/products/img-tv-samsung-smart.jpg"
            }
        ];
        res.render("home", {
            lastViewedProducts,
            onOfferProducts
        });
    },
    about: (req, res) => {
        res.send("IGUANA");
    }
};

module.exports = mainController;