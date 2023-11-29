/* Server Configuration */
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT;

/* For PUT & DELETE Management */
const methodOverride = require("method-override");

/* For FILE Management */
const multer = require("multer");

/* Routers import */
const main = require("./routes/main")
const users = require("./routes/users")
const products = require("./routes/products")

/* Public folder */
app.use(express.static(path.join(__dirname, "../", "public")));

/* EJS Setted */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/* Data Capture with POST*/
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

/* PUT & DELETE Methods enabled */
app.use(methodOverride("_method"));

/* Server Initialize */
app.listen(
    PORT, () => {
        console.log(`El servidor esta escuchando en el puerto ${PORT}`);
    }
)

/* Routers Use */
app.use(
    "/", main
);

app.use(
    "/users", users
);

app.use(
    "/products", products
);

app.use(
    (req, res, next) => {
        res.status(404).render("error");
    }
)