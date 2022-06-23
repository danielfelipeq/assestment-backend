const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/generateJWT');

module.exports = {
  // register user
  async register(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      const encryptedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        ...req.body,
        password: encryptedPassword,
      });
      const token = generateJWT(newUser._id);
      console.log(token);
      res.status(200).json({
        message: 'User created successfully',
        data: {
          token: token,
          newUser,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: 'Error creating user',
        data: err,
      });
    }
  },
  // login user
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        return res.status(400).json({ message: 'Password incorrect' });
      }

      const token = await generateJWT(user._id);

      res.status(200).json({
        message: 'User logged in successfully',
        data: user,
        token,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Error logging in user',
        data: err,
      });
    }
  },
};
