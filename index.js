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
const FileUpload = require('./model/uploadModel'); 

//

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    // cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Check file type (you can add more conditions based on your requirements)
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type'), false); // Reject the file
  }
};


const upload = multer({ storage: storage, fileFilter: fileFilter });

//for file upload.agar ek file upload karni hai toh single aur agar many karni hai toh upload.array('profileImages', 3)
app.post("/upload",upload.single('profileImage'), async (req, res) => {
   
  try {
    // Extract relevant information from the request
    const { originalname, filename, mimetype } = req.file;

    // Save file upload information to the database
    const fileUpload = new FileUpload({
      originalFileName: originalname,
      storedFileName: filename,
      fileType: mimetype,
    });

    await fileUpload.save();

    res.json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error saving file upload information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
  // res.send("file upload");
  //   return res.redirect('/');
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