const mongoose = require('mongoose');
const User = require('../Models/User');
const sha256 = require('js-sha256');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
      const{email,password} = req.body;
      const user = await User.findOne({email,password:sha256(password+process.env.HASH_SECRET)});
        if(!user) throw "Creditianls are wrong";
        const token = jwt.sign({_id:user.id},process.env.JWT_SECRET);
        
        res.json({
            message: "User logged in successfully!",
            token
        });

};


exports.signup = async (req, res) => {
   const {name,email,password,Designation} = req.body;
//    console.log(req.body);
//    /@gmail.com|@yahoo.com/;
//    const emailRegex =  /^[A-Za-z0-9._%+-]+@(gmail|yahoo)\.com$/;
//    if(emailRegex.test(email)) throw "Email is not supported";
//    if(password.length < 6) throw "Password must have atleast 6 characters";
  console.log(name,email,password,Designation)

   const UserC = await User.findOne({email});
   if(UserC){
    res.error("User already exists");
   }else{
    const user = new User({name:name,email:email,password:sha256(password+process.env.HASH_SECRET),Designation:Designation});

   await user.save().catch((err) => {
    console.log(err);
    res.status(500).json({
        message: "Something went wrong",
    })
});
   console.log(name,email,password);
   res.send(
         "User ["+name+"] registered successfully!"
    );
   }

   

};
//implement logout
exports.logout = async (req, res) => {
    res.json({
        message: "User logged out successfully!"
    });
}
//get all user
exports.getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
  }