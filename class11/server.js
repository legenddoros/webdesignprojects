const express = require("express");
const nunjucks = require("nunjucks");

// new for us to incorporate socket
const { createServer } = require("http");
const { Server } = require("socket.io");

// links websocket to our express server
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static("public"));
app.set("view engine", "njk");

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// checks if a client has been connected
io.on("connection", (socket) => {
  console.log("a user connected");

  // receiving our custom event called "chat message"
  socket.on("silly note", (msg) => {
    console.log("message: " + msg);
    io.emit("new message", msg);
  });

  // checks if a client has been disconnected
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.render("index.njk");
});

httpServer.listen(3000, () => {
  console.log("listening on *:3000");
});
