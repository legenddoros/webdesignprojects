// server.js

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

// middleware
app.use(cookieParser());

// helper for 100 years in milliseconds
const hundredYears = 100 * 365 * 24 * 60 * 60 * 1000;

// home route — sets a cookie
app.get("/", (req, res) => {
  // get current visits cookie
  let visits = req.cookies.visits ? parseInt(req.cookies.visits) : 0;

  // increment visits
  visits += 1;

  // set/update the cookie
  res.cookie("visits", visits, {
    expires: new Date(Date.now() + hundredYears),
  });

  res.send(`Welcome! You have visited ${visits} time(s).`);
});

// example route with URL parameter
app.get("/users/:userId", (req, res) => {
  res.send(req.params);
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
