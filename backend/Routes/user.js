
const express = require('express');
const router = express.Router();
const {signup , login} = require('../Controllers/userController');
const {catchErrors} = require('../handlers/errorHandler');
//users/login
router.post('/login', catchErrors(login));
//users/signup
router.post('/signup', catchErrors(signup));
module.exports = router;