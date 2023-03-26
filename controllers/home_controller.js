const File=require('../models/csvfile');

//home page with files lists
module.exports.home=async function(req,res){

    let fileList=await File.find();
    return res.render('home',{
        title:"Home",
        fileList:fileList
    });
}