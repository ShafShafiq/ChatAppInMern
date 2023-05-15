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
   const {name,email,password} = req.body;
   const emailRegex = /@gamil.com|@yahoo.com/;
   if(emailRegex.test(email)) throw "Email is not supported";
   if(password.length < 6) throw "Password must have atleast 6 characters";
  console.log(name,email,password)

   const UserC = await User.findOne({email});
   if(UserC) throw "Email already exists";

   const user = new User({name:name,email:email,password:sha256(password+process.env.HASH_SECRET)});

   await user.save();

   res.json({
         message: "User ["+name+"] registered successfully!"
    });

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