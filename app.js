require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, "public")));

app.listen(
    PORT, () => {
        console.log(`El servidor esta escuchando en el puerto ${PORT}`);
    }
)

app.get(
    "/home", (req, res) => {
        res.sendFile(path.join(__dirname, "views", "home.html"));
    }
)

app.get(
    "/login", (req, res) => {
        res.sendFile(path.join(__dirname, "views", "login.html"));
    }
)

app.get(
    "/register", (req, res) => {
        res.sendFile(path.join(__dirname, "views", "register.html"));
    }
)