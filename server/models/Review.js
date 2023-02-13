import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
  content: {type: String, required: true},
  rating: {type: Number, required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product"}
}, {timestamps: true});

export default mongoose.model('Review', ReviewSchema);