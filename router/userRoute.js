const express = require('express');
const router = express.Router();

const Login = require('../controllers/userLogin');
const Registration = require('../controllers/userRegistration');

router.post('/registration', Registration);
router.post('/login', Login);

module.exports = router;