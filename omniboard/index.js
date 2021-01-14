// index.js

/**
 * Required External Modules
 */
const { EPIPE } = require("constants");
const express = require("express");
const path = require("path");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
    res.render("index", { title: "Omniboard" });
  });
app.get("/about", (req, res) => {
    res.render("about", {title: "Omniboard"});
});
app.get("/rules", (req, res) => {
  res.render("rules", {title: "Omniboard"});
});
app.get("/edit", (req, res) => {
  res.render("edit", {title: "Omniboard"});
});
  

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });