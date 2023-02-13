import mongoose from 'mongoose';

// User schema:
const CitySchema = new mongoose.Schema({
  name: {type: String, default: ''},
  shippingCost: { type: Number },
  
  createdAt: {
    type: Date, 
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date, 
    default: () => Date.now(),
  },

});

export default mongoose.model("City", CitySchema);