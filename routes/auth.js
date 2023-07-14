const express = require('express');
const authController = require ('../controllers/auth');
const router = express.Router(); //this is mini express app pluggable to another express app


router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

module.exports = router;