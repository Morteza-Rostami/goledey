import express from 'express';
import { convertProductImg, multerConfig } from '../helpers/uploadImg.js';

const router = express.Router();

// app.post('/image', multerConfig.single('upload'), convertImage);
// .array(files_array, max num of uploaded files)
router.post('/product', multerConfig.array('imgsUpload', 4), convertProductImg);

export default router;