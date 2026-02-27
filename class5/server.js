// server.js
const express = require("express");
const nunjucks = require("nunjucks");
const nedb = require("@seald-io/nedb");

const app = express();
const database = new nedb({ filename: "data.db", autoload: true });

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Nunjucks setup
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");

// HOME PAGE
app.get("/", (req, res) => {
  res.render("home.njk");
});

// FORM PAGE
app.get("/form", (req, res) => {
  res.render("form.njk");
});

// HANDLE FORM SUBMISSION (INSERT)
app.post("/submit", (req, res) => {
  let dataToSave = {
    name: req.body.name,
    message: req.body.message,
  };

  database.insert(dataToSave, (err, newDoc) => {
    if (err) {
      console.error("Database insert error:", err);
      return res.status(500).send("Database error");
    }
    console.log("Saved:", newDoc);
    res.redirect("/entries");
  });
});

// SHOW ALL ENTRIES (FIND)
app.get("/entries", (req, res) => {
  database.find({}, (err, results) => {
    if (err) {
      console.error("Database find error:", err);
      return res.status(500).send("Database error");
    }
    res.render("entries.njk", {
      entries: results,
    });
  });
});

// START SERVER
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
