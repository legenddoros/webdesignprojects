const express = require("express");
const multer = require("multer");
const nunjucks = require("nunjucks");
const path = require("path");

const app = express();

app.use(express.static("public"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Nunjucks Setup
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Home Page
app.get("/", (req, res) => {
  res.render("home.njk");
});

app.post("/upload", upload.single("myImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const imageUrl = `/uploads/${req.file.filename}`;

  res.send(`
    <h2>Upload Successful</h2>
    <p>Here's your image:</p>
    <img src="${imageUrl}" style="max-width:300px;" />
    <br><br>
    <a href="/">Upload Another</a>
  `);
});
