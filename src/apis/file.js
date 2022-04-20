import multer from "multer"
import fs from "fs";
import express from "express";
const fileApi = express.Router();

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, './src/files');
  },
  filename: (req, file, cb) => {

    cb(null, file.originalname);
  }
});

const upload = multer({storage: storage});

fileApi.post("/", upload.single('file'), (req, res) =>{

  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });

  } else {

    setTimeout(() => {
      fs.rename(`./src/files/${req.file.originalname}`, './src/files/Test.xlsx', function(err) {
        if ( err ) {
          console.log(err)    
        }
      });
    }, 1500);
    
    return res.send({
      "success": true
    });
  }
})


export default fileApi;
