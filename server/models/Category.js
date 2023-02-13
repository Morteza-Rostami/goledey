import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
  name: {type: String, required: true},
  slug: {type: String, required: true},
  icon: {type: String, required: true},
  type: {type: String, required: true} ,
  subCatIds: [
    {type: String, required: false}
  ]
}, {timestamps: true});

export default mongoose.model('Category', CategorySchema);