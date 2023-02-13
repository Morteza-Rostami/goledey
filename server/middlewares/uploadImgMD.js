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
import Product from '../models/Product.js';

// root directory:
const __dirname = path.resolve('./');

// multer -> config -> (imageUpload)
export const multerMD = multer({
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
export async function uploadOneImg(req, res, next) {

  // array of files:
  // const images = []
  //   for (let key in req.files) {images.push(req.files[key][0]);}

  const image = req.file;

  // const imgFolderName = req.slug;
  const imgFolderName = req.body.slug;
  const imgPath = path.join(__dirname, `/public/images`);
  // const photosInfo = []

  //res.send(req.body);
  try {
    let imageName = `${imgFolderName}_${Randomstring.generate({lenght: 12})}.webp`;
    let fullPath = imgPath + '/' + imageName;
    //if img folder does not exist -> create one
    // if (!fs.existsSync(imgPath)) {
    //   fs.mkdirSync(imgPath);
    // } 
    //req.file.originalname
    // Loop: and store images on the disk:
    // for (let file of images) {

    // delete the old img from disk:
    const product = await Product.findOne({ _id: req.params.id });

    if (product) {
      const oldImgPath = imgPath + '/' + product.pictures[req.body.index];
      if (fs.existsSync(oldImgPath)) {
        fs.unlinkSync(oldImgPath);
      }
    }

    // delete the old img from db:


    await sharp(image.buffer)
        .toFormat('webp')
        .resize({ width: 1000, height: 1000 })
        .webp({ lossless: true })
        .toFile(fullPath);
    // file info
    // photosInfo.push(imageName);
    // }

    // store file info in req:
    // req.imgInfos = photosInfo;
    req.imgInfo = imageName;
    
    // product controller:
    next();

    // response:
    //res.status(201).json({ message: 'image uploaded successfuly!' });
    
  } catch (err) {
    res.status(400).json({ message: 'image upload failed!', err: err.message, error: err });
  }
}

