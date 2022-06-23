const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token)
    return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = _id;
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
  next();
};

module.exports = auth;
