/* Server Configuration */
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT;

/* Session Import */
const session = require("express-session");
app.use(session({ secret: "I got a secret" }));

/* For PUT & DELETE Management */
const methodOverride = require("method-override");

/* Routers import */
const main = require("./routes/main");
const users = require("./routes/users");
const products = require("./routes/products");
const apiProducts = require("./routes/api/apiProducts");
const apiUsers = require("./routes/api/apiUsers");

/* Public folder */
app.use(express.static(path.join(__dirname, "../", "public")));

/* EJS Setted */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/* Data Capture with POST*/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* CORS Config */
const cors = require("cors");
app.use(cors(["localhost:5678", "localhost:5173"]));

/* PUT & DELETE Methods enabled */
app.use(methodOverride("_method"));

/* Server Initialize */
app.listen(PORT, () => {
  console.log(`Servidor Funcionando...`);
  console.log(`Accede por este link -> http://localhost:${PORT}`);
});

/* Routers Use */
app.use("/", main);
app.use("/users", users);
app.use("/products", products);
app.use("/api/products", apiProducts);
app.use("/api/users", apiUsers);
app.use((req, res, next) => {
  res.status(404).render("error", {
    userLoggedIn: req.session.userLoggedIn,
  });
});
