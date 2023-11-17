require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT;

const main = require("./routes/main")
const users = require("./routes/users")
const products = require("./routes/products")

app.use(express.static(path.join(__dirname, "../", "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(
    PORT, () => {
        console.log(`El servidor esta escuchando en el puerto ${PORT}`);
    }
)

app.use(
    "/", main
)

app.use(
    "/users", users
)

app.use(
    "/products", products
)