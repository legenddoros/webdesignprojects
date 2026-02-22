const express = require("express");
const app = express();

// Middleware to serve static files and parse POST data
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Array to store guestbook submissions
let receivedData = [];

// Endpoint to receive form submissions
app.post("/submit", (req, res) => {
  console.log(req.body); // Full form data
  console.log(req.body.message); // Message only

  // Save the submission
  receivedData.push({
    user: req.body.username,
    message: req.body.message,
  });

  // Send a thank-you message
  res.send("Thank you for your submission, " + req.body.username);
});

// Endpoint to view all guestbook messages
app.get("/messages", (req, res) => {
  if (receivedData.length === 0) {
    res.send("No messages yet...");
  } else {
    res.json({ messages: receivedData });
  }
});

// Start the server
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
