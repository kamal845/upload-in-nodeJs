const express = require("express");
const app = express();
const path = require("path");
const multer=require('multer');
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
port = 4000;
const connectDB = require("./database/connectDB");

app.get("/", (req, res) => {
  res.render("index2");
});
//for file upload
app.post("/upload", (req, res) => {
  res.send("file upload");
});
//
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "/uploads");
    },
    filename: function (req, res, cb) {
cb(null,file.fieldname + "-" + Date.now() + '.jpg')
    }
  }),
});
try {
  app.listen(port, (req, res) => {
    connectDB()
      .then(() => {
        console.log("Server is started on port no. 4000");
      })
      .catch((error) => {
        console.log("Error connectting to the database:", error);
      });
  });
} catch (error) {
  console.log("Error:", error);
}
