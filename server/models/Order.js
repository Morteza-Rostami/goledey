import mongoose from "mongoose";

const objectId = mongoose.Types.ObjectId;

const OrderSchema = mongoose.Schema({
  number: {type: String, required: true, unique: true},
  user: {type: objectId, ref: "User", required: true},
  products: [
    {
      product: {type: objectId, ref: "Product", required: true},
      amount: {type: Number, required: true},
      total: {type: Number, required: true},
      // card message
      cardMsg: {type: String}
    }
  ],
  // message at the end before purchase
  customerMsg: {type: String},
  adminMsg: {type: String},
  deliveryTime: {type: Date, required: true},
  // deliveryAddress: {type: String},
  status: {type: String, default: "UNPAID", required: true},
  total: {type: Number, required: true}
}, 
{timestamps: true});

export default mongoose.model('Order', OrderSchema);