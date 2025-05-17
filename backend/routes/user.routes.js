const { getHrProfile } = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifytoken');
const router = require('express').Router();



router.get('/profile', verifyToken , getHrProfile);


module.exports = router;