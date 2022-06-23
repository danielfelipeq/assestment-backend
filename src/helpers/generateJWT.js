const jwt = require('jsonwebtoken');

const generateJWT = (_id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  return token;
};

module.exports = { generateJWT };
