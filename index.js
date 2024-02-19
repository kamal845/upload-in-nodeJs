const express=require('express')
const app=express();
port=3000;
const connectDB=require("./database/connectDB");
try {
    app.listen(port, (req,res) => {
        connectDB().then(() => {
            console.log("Serverrrrr is started on port no. 3000");
        }).catch(error => {
            console.log("Error connecting to the database:", error);
        });
    });
} catch (error) {
    console.log("Error:", error);
}
