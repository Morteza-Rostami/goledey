import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// User schema:
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    lowercase: true,
    // min and max: length:
    minLength: 5,
    maxLength: 30
  },
  email: {type: String, default: ''},
  cellPhone: { type: String, required: true, unique: true },
  password: { type: String, minLength: 6, maxLength: 1024 },
  creditCard: { type: String },
  birthday: {type: Date},
  address: {
    city: {type: mongoose.Schema.Types.ObjectId, ref: 'City'},
    fullAddress: {type: String},
    phone: {type: String},
  },
  //isAdmin: {type: Boolean},
  role: {type: String},
  createdAt: {
    type: Date, 
    // not updatable:
    immutable: true,
    // default current date
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date, 
    default: () => Date.now(),
  },

});

UserSchema.methods.generateJWT = function () {
  const token = jwt.sign({
    _id: this._id,
    phone: this.cellPhone,
    name: this?.name || '',
    role: this?.role || ''
  },
  process.env.JWT_PRIVATE_KEY,
  // 1 minute, 1 week -> 7d 7200
  { expiresIn:  86400000}
  
  );

  return token;
}

// create the model => collection in mongodb:
// User: name of collection in db, schema object.
export default mongoose.model("User", UserSchema);



/* 
required: true,

age: {
  type: Number,
  // custom validator function:
  // validate: {
  //   // check if number is even:
  //   validator: val => val % 2,
  //   // error message: 
  //   message: props => `${props.val} is not an even number.`
  // }
},

  // an array of strings.
  hobbies: [String],
  // nested object:
  // address: {
  //   street: String,
  //   city: String
  // }

  // nested schema:
  address: addressSchema,

// address schema:
const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

// adding methods to each instance of model:
// can't be arrow function!
userSchema.methods.getName = function() {
  console.log(`name is: ${this.name}`);
}

// static method -> on: User.
//===

// this deos not work -> returns: query-obj instead of: model_obj
userSchema.statics.findByName = function(name) {
  // return model with certain name in lowercase:
  // return this.where({ name: new RegExp(name, 'i') });
  // return this.where("name").equals(name);
}
*/