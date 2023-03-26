const express=require('express');
const router=express.Router();

const filecontroller=require('../controllers/file_controller');

//creating new record
router.post('/create',filecontroller.create);

//get the files details
router.get('/view/:id',filecontroller.view);

//get the id to delete the record
router.get('/delete/:id',filecontroller.delete);


module.exports = router;