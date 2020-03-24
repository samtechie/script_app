const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const scriptsRoutes = require("./routes/scripts");
const userRoutes = require("./routes/user");
const adminUserRoutes = require("./routes/admin");


const app = express();

// mongoose
//   .connect(
//     "mongodb+srv://samuel:"+ process.env.MONGO_ATLAS_PW + "@cluster0-yc3ew.mongodb.net/node-angular?retryWrites=true&w=majority",
//     { useNewUrlParser: true }
//   )
//   .then(() => {
//     console.log("Connected to Database");
//   })
//   .catch(() => {
//     console.log("Connection failed");
//   });

 mongoose
   .connect("mongodb://localhost:27017/scriptapp", { useNewUrlParser: true })
   .then(() => {
     console.log("Connected to Database");
   })
   .catch(() => {
     console.log("Connection failed");
   });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  next();
});

app.use("/api/scripts",scriptsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin/user", adminUserRoutes)


module.exports = app;

