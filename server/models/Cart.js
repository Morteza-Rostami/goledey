import mongoose from "mongoose";

const objectId = mongoose.Types.ObjectId;

const CartSchema = mongoose.Schema({
  user: { type: objectId, ref: "User", required: true, unique: true },
  products: [
    {
      //product: {type: objectId, ref: "Product", required: true},
      product: Object,
      amount: {type: Number, required: true},
      total: {type: Number, required: true},
      cardMsg: {type: String},
      // difference between old and new price
      diff: {price: Number, txt: String},
    }
  ],
  itemsCount: {type: Number},
  total: {type: Number, required: true}
}, {timestamps: true});

export default mongoose.model('Cart', CartSchema);