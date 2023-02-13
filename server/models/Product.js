import mongoose from "mongoose";

// post schema
const ProductSchema = mongoose.Schema({
  code : {type: String, unique: true},
  name: {type: String, required: true},
  slug: {type: String, required: true},
  shortDesc: {type: String},
  longDesc: {type: String},
  inStock: {type: Boolean, default: true},
  hasCardMsg: {type: Boolean, default: false},
  pictures: [String],
  categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
  price: {type: Number, required: true},
  tags: {type: String},
  //createdAt: {type: Date, default: Date.now}
}, {timestamps: true});

// index 
// schema.index({name: 'text', 'profile.something': 'text'});
// ProductSchema.index({ name: 'text' });
ProductSchema.index({ tags: 'text' });


export default mongoose.model('Product', ProductSchema);