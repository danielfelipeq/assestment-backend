const jwt = require('jsonwebtoken');

// get user from token to use in controller
const getUserFromToken = (req, res) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (e) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const validateJwt = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({
      message: 'No token provided.',
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).send({
      message: 'Invalid token.',
    });
  }
};

module.exports = { validateJwt, getUserFromToken };
