const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/studentList");

const userSchema = new mongoose.Schema({
  name: String,
  department: String,
  email: String,
  mobile: String,
  address: String
});

const Student = new mongoose.model("Student", userSchema);

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const newUser = new Student({
    name: req.body.sname,
    department: req.body.sdepartment,
    email: req.body.semail,
    mobile: req.body.smobile,
    address: req.body.saddress
  });
  Student.create(newUser);
  res.send("Added successfully");
});

app.get("/list", function(req, res){
  Student.find({}, function(err, students){
    res.render("list", {studentlist: students})
  })
})

app.listen(3000, function(req, res){
  console.log("The server has started on port 3000");
});
