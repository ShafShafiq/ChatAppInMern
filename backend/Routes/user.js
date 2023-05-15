
const express = require('express');
const router = express.Router();
const {signup , login , logout,getAllUsers} = require('../Controllers/userController');
const {catchErrors} = require('../handlers/errorHandler');
//users/login
router.post('/login', catchErrors(login));
//users/signup
router.post('/signup', catchErrors(signup));
//users/logout
router.get('/logout',catchErrors(logout)) 
//users/all
router.get('/all',catchErrors(getAllUsers))
module.exports = router;