// image upload
import multer from 'multer';
import sharp from 'sharp';
// random string
import Randomstring from 'randomstring';
// file path to url
import url from 'url';

// path file
import path from 'path';
import { fileURLToPath } from 'url';

// making folder
import fs from 'fs';

// /home/gino/Coding/MERN/react_mongo/ecommerceOne/server/server.js
//const __filename = fileURLToPath(import.meta.url); // current file
// /home/gino/Coding/MERN/react_mongo/ecommerceOne/server
//const __dirname = path.dirname(__filename);

// root directory:
const __dirname = path.resolve('./');

// multer -> config -> (imageUpload)
export const multerConfig = multer({
  limits: {
    // 1mb file size
    fileSize: 1000000,
  },

  // request, uploaded file, callback
  fileFilter: (req, file, cb) => {
    
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
      return cb(new Error('please enter a valid image file!'));
    }
    // else : file type ok!
    // args: error, true: accept upload - false: reject upload.
    cb(undefined, true);
  }

});

// upload product image:
export async function convertProductImg(req, res, next) {

  // array of files:
  const images = []
    for (let key in req.files) {images.push(req.files[key][0]);}

  // res.send(req.file);
  const imgFolderName = req.slug;
  const imgPath = path.join(__dirname, `/public/images`);
  const photosInfo = []

  //res.send(req.body);
  try {
    //if img folder does not exist -> create one
    // if (!fs.existsSync(imgPath)) {
    //   fs.mkdirSync(imgPath);
    // } 
    //req.file.originalname
    // Loop: and store images on the disk:
    for (let file of images) {
      let imageName = `${imgFolderName}_${Randomstring.generate({lenght: 12})}.webp`;
      let fullPath = imgPath + '/' + imageName;
      await sharp(file.buffer)
          .toFormat('webp')
          .resize({ width: 1000, height: 1000 })
          .webp({ lossless: true })
          .toFile(fullPath);
      // file info
      photosInfo.push(imageName);
    }

    // store file info in req:
    req.imgInfos = photosInfo;
    
    // product controller:
    next();

    // response:
    //res.status(201).json({ message: 'image uploaded successfuly!' });
    
  } catch (err) {
    res.status(400).json({ message: 'image upload failed!', err: err.message, error: err });
  }
}

