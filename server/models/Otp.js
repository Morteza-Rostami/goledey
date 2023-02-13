import mongoose from "mongoose";
import { OTP_TIME } from "../CONST/CONSTBACK.js";

const OtpSchema = mongoose.Schema({
  otp: {type:String, required: true},
  cellPhone: {type:String, required: true},
  createdAt: {
    type: Date, 
    default: Date.now,
    // 5 minutes: 300 seconds
    index: {expires: OTP_TIME}
  }
}, {timeStamps: true});

export default mongoose.model('Otp', OtpSchema);