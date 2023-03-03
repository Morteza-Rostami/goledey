
import Review from '../models/Review.js';
import Product from '../models/Product.js';
import HELPER from '../helpers/helpers.js';
import mongoose from 'mongoose';
// import moment from 'moment';

import moment from 'jalali-moment';

import User from '../models/User.js';

// set locale globaly
moment.locale('fa');

const reviewController = {
  // get all
  get: async (req, res, next) => {
    const slug = req.params?.slug;

    try {
      const product = await Product.findOne({ slug: slug });
      // const productObjId = mongoose.Schema.Types.ObjectId(product._id);
      let reviews = 
       await Review
        .find({ productId: mongoose.Types.ObjectId(product._id) })
        .sort({ createdAt: -1 });

       // average review for product:
      //  const ratingsArr = 
      //    reviews.map(({rating}) => rating );
      // let average = 
      //   ratingsArr.reduce((init , currentVal) => init = init + currentVal) / reviews.length;

      reviews = reviews.map((rev, i) => rev.toObject());

      for (let i=0; i < reviews.length; i++) {
        const rev = reviews[i];
        const user = await User.findOne({ _id: rev.userId });
        reviews[i].userName = user.name;
      }

      reviews = reviews.map(rev => {
        return {
          _id: rev._id,
          content: rev.content,
          rating: rev.rating,
          //Date: moment(rev.createdAt).fromNow()
          // .format('YYYY/MM/DD')
          date: moment(rev.createdAt).fromNow(),
          userName: rev.userName,
        }
      });
      
      req.customData = reviews;
      
      next();

      //res.status(200).json(reviews);
    } catch(err) {
      console.log(err)
      return res.status(400).json({ 
        message: 'controller: /reviews/get ', 
        err: err.message, 
        path: err.stack 
      });
    }
  },

  // get one 

  // create
  create: async (req, res) => {
    const content = req.body?.content;
    const rating = req.body?.rating;
    const productId = req.body?.productId;
    const userId = req.body?.user


    try {

      // validate data
      if (!content) throw 'content: does not exist.';
      if (!rating) throw 'rating: does not exist.';
      if (!productId) throw 'productId: does not exist.';

      const review = new Review({
        content: content,
        rating: rating,
        productId: productId,
        userId: userId,
      });

      let newReview = await review.save();

      const user = await User.findOne({ _id: newReview.userId });

      newReview = {
        _id: newReview._id,
        content: newReview.content,
        rating: newReview.rating,
        date: moment(newReview.createdAt).fromNow(),
        userName: user.name,
      };

      return res.status(200).json(newReview);

    } catch(err) {
      return res.status(400).json({ 
        message: 'controller: /reviews/create ', 
        err: err.message,
        path: err.stack,
      });
      
    }
  },

  // update

  // delete


}

export default reviewController;