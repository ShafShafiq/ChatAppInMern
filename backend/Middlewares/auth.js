// const jwt = require("jsonwebtoken");
// exports.auth = async (req , res , next) => {
//     try {
        
   
//      const token = req.header.authorization.split(" ")[1];
//         if(!token){
//             return res.status(401).json({
//                 message: "Auth failed"
//             });
//         }
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.token = decoded;
//         next();
//     } catch (error) {
//         res.status(401).json({
//             message: "Auth failed 2"
//         });
//     }
// }
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw "Authorization failed";
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET
        );
    req.payload = payload;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Authorization failed 🚫🚫🚫",
    });
  }
};