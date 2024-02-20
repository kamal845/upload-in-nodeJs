const express = require("express");
const app = express();
const path = require("path");
const multer=require('multer');
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
port = 4000;
const connectDB = require("./database/connectDB");
// const upload=multer({dest:'upload/'});
app.get("/", (req, res) => {
  res.render("index2");
});
//
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
     return cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
     return cb(null,`${Date.now()}-${file.originalname}`);
    }
  }),
});
//for file upload.agar ek file upload karni hai toh single aur agar many karni hai toh upload.array('profileImages', 3)
app.post("/upload",upload.single('profileImage'), (req, res) => {
    res.send("file upload");
    return res.redirect('/');
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
