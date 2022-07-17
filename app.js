const express =require("express");
const app=express();
const mongoose=require("mongoose");
const bodyparser=require('body-parser');
const port =process.env.Port || 3000;


app.use(bodyparser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/register" ,{useNewUrlParser:true},{useUnifiedTopology:true});

const userSchema={
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
        
    }
}
const User=mongoose.model("User",userSchema);

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.get("/login.html", function(req,res){
    res.sendFile(__dirname+"/login.html");
})
app.get("/index.html", function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
    let newuserSchema= new userSchema({
        username:req.body.username,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password
    });
    newuserSchema.save();
    res.redirect('/');
})


app.listen(port, function(){
    console.log(`server is running at ${port}`)
})