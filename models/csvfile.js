const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');

const CSV_PATH=path.join('/uploads/csv_files');

const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    file:{
      type:Array
  },
},{
    timestamps: true,toJSON: { virtuals: true }
});


//storing the file in the folder
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',CSV_PATH));
    },
    filename: function (req, file, cb) {
     // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
  })



fileSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
fileSchema.statics.avatarPath=CSV_PATH;

const File=mongoose.model('File',fileSchema);

module.exports=File;