import express from 'express';
// get Router object
const router = express.Router();

// import controller:
import productController from '../controllers/productController.js';
import { convertProductImg, multerConfig } from '../helpers/uploadImg.js';
import makeSlug from '../middlewares/makeSlugMiddle.js';
import paginatedResults from '../middlewares/paginatedApi.js';

// new: upload one photo middleware
import { multerMD } from '../middlewares/uploadImgMD.js';
import { uploadOneImg } from '../middlewares/uploadImgMD.js';
import { accessAdmin, accessAuth } from '../middlewares/accessMiddle.js';

// using: controller
router.get('/get', productController.get, paginatedResults());

// get one post
// http://localhost:5001/posts/post
router.get('/get/:slug', productController.getOne);

// create: one post
router.post('/create',
  accessAuth,
  accessAdmin, 
  multerConfig.fields([
    {name: 'photos[0]'},
    {name: 'photos[1]'},
    {name: 'photos[2]'},
    {name: 'photos[3]'},
  ]), 
  makeSlug,
  convertProductImg, 
  productController.create);






// update
router.patch('/update/:id', 
  accessAuth,
  accessAdmin,
  productController.update);

  /* update or add one img of product at a time */
router.patch('/updateImg/:id',
  accessAuth,
  accessAdmin,
  multerMD.single('file'),
  uploadOneImg,
  productController.updateImg
  );






// delete
// any delete request -> auto comes here.
router.delete('/delete/:id', 

accessAuth,
accessAdmin,
productController.delete);

// search:
// router.get('/search', productController.search, paginatedResults());


export default router;