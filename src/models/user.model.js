const { Schema, model } = require('mongoose');

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

// Each user will have a unique id, and he will authenticate using a non-empty email and a password

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already exists'],
      match: [emailRegex, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      match: [passwordRegex, 'Please enter a valid password'],
    },
    lists: [{ type: Schema.Types.ObjectId, ref: 'List' }],
  },
  { timestamps: true }
);

const User = model('User', userSchema);
module.exports = User;
