
import City from '../models/City.js';
import HELPER from '../helpers/helpers.js';

const cityController = {

  get: async (req, res) => {
    
   
    try {
      
      const cities = await City.find();

      return res.status(200).json(cities);

    } catch(err) {
      return res.status(400).json({ message: 'controller: cities/get' });
    }
  }
}

export default cityController;