const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const AutoIncrement = require("mongoose-sequence")(mongoose);

mongoose.connect("mongodb://localhost:27017/crud");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  id: {
    type: Number,
    unique: true,
  },
  username: String,
  // age: {
  //   type:Number,
  //   require:true,
  // },
  // address: {
  //   type:String,
  //   require:true
  //  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 2 
  },
});

UserSchema.plugin(AutoIncrement, { inc_field: "id" });

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
