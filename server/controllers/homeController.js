
import HELPER from '../helpers/helpers.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

import Category from '../models/Category.js';

const homeController = {

  get: async (req, res) => {

    // make ids dynamic:

    const dasteGolM = await Category.findOne({ slug: 'daste-gol' });
    const sabadGolM = await Category.findOne({ slug: 'sabad-gol' });
    const payeGolM = await Category.findOne({ slug: 'paye-gol' });

    const dasteGol = dasteGolM._id;
    const sabadGol = sabadGolM._id;
    const payeGol = payeGolM._id;

    console.log(dasteGol)
   
    try {
      
      // get best selling dasteh gol

      // const flowers = await Order.aggregate([
      //   { $unwind: "$products" },
      //   { $match: {  } },
      // ]);

      // get: best selling dasteh gole:

      const topDasteGol = await HELPER.getTopSell(dasteGol, req);
      const topSabadGol = await HELPER.getTopSell(sabadGol, req);
      const topPayeGol = await HELPER.getTopSell(payeGol, req);

      // get best selling sabade gol
      const homeData = {
        topDasteGol: topDasteGol,
        topSabadGol: topSabadGol,
        topPayeGol: topPayeGol,
      };


      return res.status(200).json(homeData);


    } catch(err) {
      return res.status(400).json({ message: 'controller: home/get', err: err.message });
    }
  }
}

export default homeController;