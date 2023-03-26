const express=require('express');
const router=express.Router();


const homecontroller=require('../controllers/home_controller');

router.get('/',homecontroller.home);
router.use('/files', require('./files'));

module.exports = router;