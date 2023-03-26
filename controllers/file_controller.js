const File=require('../models/csvfile');
const fs = require('fs');
const path = require('path');
const parse = require('csv-parser');
//const Papa = require("papaparse");
const result=[];

//create a new  file
module.exports.create=async function(req,res){
   
    try{

        File.uploadedAvatar(req, res, function(err){
            if (err) {console.log('*****Multer Error: ', err)}

            File.findOne({name: req.file.originalname},function(err,fileInfo){
                
                if(fileInfo==null){

                    if(req.file.mimetype == 'text/csv') {

                            var file = './uploads/csv_files/'+req.file.originalname;
        
                            console.log(file);

                            fs.createReadStream(file)
                                .pipe(parse())
                                .on('data',(data)=>{
                                    result.push(data)
                                })
                                .on('error',(err)=>{
                                    console.log(err);
                                })
                                .on('end', () => {

                                   
                                    if (req.file && req.file.mimetype == 'text/csv'){
                                        File.create({
                                            name:req.file.originalname,
                                            file:result
                                        })
                                    }
                                });
        
        
                            
                            req.flash('success', 'Csv File uploaded Successfully');
                            return res.redirect('back');
        
                        }else{
                            req.flash('error', 'Select only csv file');
                            return res.redirect('back');
        
                        }

                }else if (fileInfo){
                    req.flash('error', 'The file is already exists');
                    return res.redirect('/');
                }
            });
        });

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }

    
}

//fetch the selected file record with dynamic heading and datas
module.exports.view=async function(req,res){
    let fileId=req.params.id;
    let fileExit=await File.findById(fileId);

   
                  
    if(fileExit){
        res.render('file',{
                'title':'File View',
                name:fileExit.name,
                header:fileExit.file[0],
                data:fileExit.file
        })
        
    }
}

//delete file permanently
module.exports.delete=async function(req,res){

    try{
        let fileId=req.params.id;

        let fileName=await File.findById({_id:fileId},{name:1});

        if(fileName.name){
            fs.unlinkSync(path.join(__dirname,  '../uploads/csv_files/'+fileName.name));
        }
        
        if(fileId){

            await File.findByIdAndDelete({_id:fileId});
            req.flash('success', 'File deleted Successfully');
             return res.redirect('/');

        }else{
            req.flash('error', 'Try again later!');
            return res.redirect('/');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }

       
}