
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
 const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
/////////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect("mongodb://localhost:27017/userDB",{ useUnifiedTopology: true,useNewUrlParser: true })

const userSchema={
  email:String,
  password:String
};

const User=new mongoose.model("User",userSchema);


/////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/",function(req,res){
  res.render("home");
});

app.get("/login",function(req,res){
  res.render("login");
});

app.get("/register",function(req,res){
  res.render("register");
});
//--------------------------------------------------------------------------------------

app.post("/register",function(req,res){

const newuser=new User({
  email:req.body.username,
  password:req.body.password
});

newuser.save(function(err){
  if(!err)
  res.render("secrets");
});

});


app.post("/login",function(req,res){
  const username=req.body.username;
  const pass=req.body.password;

  User.findOne({email:username,password:pass},function(err,foundUser){
    if(!err)
    {if(foundUser)
     res.render("secrets");
    else
    res.render("home");}
  });
});
