
import HELPER from '../helpers/helpers.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const homeController = {

  get: async (req, res) => {
    const dasteGol = '63999c6522b76365284e2bd2';
    const sabadGol = '63999be122b76365284e2bd0';
    const payeGol = '639c11c83f7642af7f4964a1';
   
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