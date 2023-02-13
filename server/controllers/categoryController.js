
import Category from '../models/Category.js';
import HELPER from '../helpers/helpers.js';

const categoryController = {

  get: async (req, res) => {
    
    // get subcategories
    // let subCats = categories.map(cat => cat.subCatIds);
    // res.json(subCats);
    // return;
    try {
      const categories = await Category.find();

      const customCats = await HELPER.editCategories(categories);
      
      return res.status(200).json(customCats);
      // setTimeout(() => {

      // }, 9000);
    } catch(err) {
      return res.status(400).json({ message: 'controller: categories/get', err: err.message });
    }
  },

  getBySlug: async (req, res) => {
    const slug = req.params?.slug;
    try {
      const categories = await Category.find({ slug: slug });
      const customCats = await HELPER.editCategories(categories)
      return res.status(200).json(customCats[0]);
    } catch (err) {
      return res.status(400).json({ message: 'controller: categories/getBySlug', err: err.message });
    }
  }
}

export default categoryController;