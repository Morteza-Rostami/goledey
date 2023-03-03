// import express:
import express from 'express';
// import body parser:
import bodyParser from 'body-parser';
// dotenv
import dotenv from 'dotenv';
// cors:
import cors from 'cors';

// import db connection
import {connect} from './database/db.js';

// create express instance:
const app = express();

// import dotenv package
dotenv.config();
// use padyParser midddleware
app.use(bodyParser.text({defaultCharset: 'utf-8'}));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// routes:
//===

import productRoutes from './routes/productR.js';
import imgRoutes from './routes/imgUploadR.js';
import categoryRoutes from './routes/categoryR.js';
import reviewRoutes from './routes/reviewR.js';
import userRoutes from './routes/userR.js';
import cartRoutes from './routes/cartR.js';
import cityRoutes from './routes/cityR.js';
import orderRoutes from './routes/orderR.js';
import homeRoutes from './routes/homeR.js';
import adminRoutes from './routes/adminR.js';
import transactionRoutes from './routes/paymentR.js';

// using routes:
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/images', imgRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/transactions', transactionRoutes);

// static path to server images.
app.use('/public', express.static('public'));
app.use('/images', express.static('images'));


// start express server:
app.listen(process.env.PORT, 
  () => console.log(`express server runs on port: ${process.env.PORT}`));
// connect to db:
connect();


