import mongoose from 'mongoose';

// User schema:
const PaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  order: { type: mongoose.Types.ObjectId, ref: 'Order' },
  resnumber: { type: String,  required: true}, // zarinpal gives this in proccess
	// amount  user just payed
	amount: { type: Number, required: true },
	// false: unpaied true: paid
	payment: { type: Boolean, default: false }

}, {timestamps: true});

export default mongoose.model("Payment", PaymentSchema);

/* 
createdAt: {
    type: Date, 
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date, 
    default: () => Date.now(),
  },

*/