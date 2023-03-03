
// model
import User from "../models/User.js";
import Otp from "../models/Otp.js";

// joi: for data validation
import joi from 'joi';
// hash password
import bcrypt from 'bcrypt';
// opt 
import otpGenerator from 'otp-generator';
import HELPER from "../helpers/helpers.js";

import { OTP_TIME } from "../CONST/CONSTBACK.js";
import UserHelp from "../helpers/userHelp.js";


// function: generate otp and send sms
function generateOtpAndSendSMS(phone) {
  // make new one time password
  const otp = otpGenerator.generate(6, {
    // options
    digits: true,
    // alphabets: false,
    // upperCase: false, 
    specialChars: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
  });

  // send otp to phone
  console.log(`phone: ${phone} otp: ${otp}`);

  
  
  
  return otp;
}

async function hashAndStoreOtp(otp, phone) {
  
  // hash the otp 
  const salt = await bcrypt.genSalt(10);
  const hashedOtp = await bcrypt.hash(otp, salt);

  // make: model: otp, phone for storing in DB
  const otpModel = new Otp({
    otp: hashedOtp,
    cellPhone: phone,
  });
  // save in db and return model
  const OTP = otpModel.save();
  return OTP;
}

const userController = {

  // signup a new user
  register: async (req, res) => {
    let otp = '';

    try {
      const phone = req.body.cellPhone;
      // check if phone number exist
      if (!phone) return res.status(400).json({ message: 'شماره تلفن خود را وارد کنید!' });

      // check if at least two otps for this phone exist. return:
      const otps = await Otp.find({ cellPhone: phone });
      if (otps?.length) {
        return res.json({
          message: `برای صدور کد تایید دیگر ${OTP_TIME / 60} دقیقه صبر کنید!`,
          CoolDown: true,
        })
      }

      const user = await User.findOne({ cellPhone: phone });
      let newUser = {};
      
      // if: user exist in DB
      if (user) {
        // generate otp and send a SMS
        otp = generateOtpAndSendSMS(phone);
        await hashAndStoreOtp(otp, phone);
      } else {
        // create new user
        newUser = await User.create({
          cellPhone: phone,
          name: 'کاربر'
        });
        // generate otp and send a SMS
        otp = generateOtpAndSendSMS(newUser.cellPhone);
        await hashAndStoreOtp(otp, newUser.cellPhone);
      }

      // success
      console.log('register')

      // set otp to user: (SMS)
      // const smsRes = 
      // await UserHelp.sendSms(otp, phone, `${user?.name || newUser?.name} ; ${otp}`, 126570);
      const smsRes = {RetStatus: 1}
      if (smsRes.RetStatus === 1) {
        return res.status(200).json({ message: `کد تایید به شماره ${phone} ارسال شد.`, success: true });

      } else {
        return res.status(200).json({ 
          message: `‌ارسال پیام به مشکل خود. لطفا کمی صبر کنید و دوباره تلاش کنید!`, 
          success: true 
        });
      }


    } catch(err) {
      console.log(err)
      return res.status(400).json({ 
        message: 'userController: /users/register', 
        err: JSON.stringify(err.message) 
      });
    }
  },

  // login a user
  verifyOtp: async (req, res) => {
    const phone = req.body.cellPhone;
    const otp = req.body.otp;

    if (!phone || !otp) 
      return res.status(400).json({ message: 'شماره تلفن و کد تایید را وارد کنید!' });

    try {

      // check if otp exist in db -> not expired or fake
      const dbOtp = await Otp.find({cellPhone: phone});

      if (!dbOtp.length) 
        return res.status(400).json({ message: "کد تایید شما منقضی شده!", expired: true})
      
      // there might be more that one otp for -> a number 
      const lastOtp = dbOtp[dbOtp.length - 1];

      // compare the last otp user entered with last in DB
      const isValidUser = await bcrypt.compare(otp, lastOtp.otp);

      // if: phone and otp correct
      if ((lastOtp.cellPhone === phone) && isValidUser) {
        // get the user
        const user = await User.findOne({ cellPhone: phone });
        
        // create jwt with user data
        const token = user.generateJWT();

        // delete all otps with this phone
        const deletedOtps = await Otp.deleteMany({ cellPhone: phone });
        
        // take out password
        const {password, ...rest} = user._doc;

        const formatedUser = await HELPER.formatUser(rest);


        // send res with: user, token
        setTimeout(() => {
          return res.status(200).json({
            message: 'LOGGED SUCCESS',
            token: token,
            user: formatedUser,
            success: true
          });
          
        }, 4000);

      } else {
        // if otp not valid => body.otp !== db.otp
        return res.json({ wrongOtp: true, message: 'کد تایید صحیح نمیباشد!' });
      }

    } catch(err) {
      return res.status(400).json({ 
        message: 'userController: /users/verifyOtp', 
        err: JSON.stringify(err.message) 
      });
    }
  },

  // update user profile
  update: async (req, res) => {
    const userId = req.params?.id;
    const user = req?.body;

    try {
      // update user infos
      if (user) {
        let userDB = await User.findById(userId);
        
        // userDB = {...userDB._doc, ...user};
        userDB.name = user.name;
        userDB.email = user.email;
        userDB.creditCard = user.creditCard;
        userDB.birthday = user.birthday;
  
        const userM = await userDB.save();
        const formatedUser = await HELPER.formatUser(userM);
        
        return res.status(200).json(formatedUser);
      } 

    } catch(err) {
      return res.status(400).json({ 
        message: 'userController: /users/update', 
        err: JSON.stringify(err.message) 
      });
    }
  },

  updateAddress: async (req, res) => {
    const address = req.body;
    const userId = req.params.id;

    console.log(address, userId);
    try {
      
      const userDB = await User.findById(userId);

      userDB.address = address;

      const updatedUser = await userDB.save();

      // edit user
      const formatedUser = await HELPER.formatUser(updatedUser);
      return res.status(200).json(formatedUser);


    } catch(err) {
      return res.status(400).json({ 
        message: 'userController: /address/:id', 
        err: JSON.stringify(err.message) 
      });
    }
  },









  // admin: get all the users:
  get: async (req, res) => {
    try {

    } catch(err) {
      res.status(400).json({ 
        message: 'userController: /users/get', 
        err: JSON.stringify(err) 
      });
    }
  },

}

export default userController;