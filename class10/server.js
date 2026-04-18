// how do we know this is a npm project?
// A: becasue it has package json

// what command do we run to start an npm project?
// A: npm init

// how do we create the node_modules folder if it doesn't exist?
// A: npm install

// what does the below chunk of code do?
// A: imports libraries
const express = require("express");
const multer = require("multer");
const nunjucks = require("nunjucks");
const nedb = require("@seald-io/nedb");

// what is app?
// A: It allows us to create a server.
const app = express();
// what is database?
// A: It allows us to store and retrieve data.
const database = new nedb({ filename: "data.db", autoload: true });

// what is this configuring?
// A: allows us to upload files
const upload = multer({
  dest: "public/uploads",
});

// what do each of these statements do?
// write the answer next to the line of code
app.use(express.static("public")); // A: tells the server to use folder named public
app.use(express.urlencoded({ extended: true })); // A: tells express to parse urlencoded data.
app.set("view engine", "njk"); // A: telling server to use nunjucks view engine
nunjucks.configure("views", {
  autoescape: true,
  express: app,
}); // A: configure nunjucks to use the views folder and autoescape means it will automatically escape any HTML characters in the data we pass to the template to prevent XSS attacks.

// what type of request is this? what does it do?
// A: get request, it renders the home page when the user visits the root URL.
app.get("/", (request, response) => {
  // how many different responses can we write? list them.
  // A: sendfile, render, send, json, redirect
  // how many parameters does response.render use? list them.
  // A: filename, data, callback
  // write out the render for index.njk using the database
  database.find({}, () => {
    response.render("index.njk");
  });
});

// what are the three parameters in this function?
// A:route, middleware that handles file upload, callback function that handles the request and response
app.post("/upload", upload.single("theimage"), (req, res) => {
  let currentDate = new Date();

  // what type of data structure is this?
  // A: object because of curly braces.
  let data = {
    dataCaption: req.body.text,
    date: currentDate.toLocaleString(),
    timestamp: currentDate.getTime(),
  };

  // why do we write this if statement?
  // A: ensures a file exists before storing in database.
  if (req.file) {
    data.image = "/uploads/" + req.file.filename;
  }

  // what does the insert function do?
  // A: adds data to the database .
  database.insert(dataToBeStored);

  resopnse.redirect("/");
});

// what does the number signify?
// A: the port .
// how do we access this on the web?
// A: http://localhost:6001
app.listen(6001, () => {
  console.log("server started on port 6001");
});

// continue answering the questions in the index.njk
