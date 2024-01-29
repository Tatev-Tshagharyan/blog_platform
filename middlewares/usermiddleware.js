const jwt = require('jsonwebtoken');
require('dotenv').config();

const accessSecret = process.env.JWT_ACCESS_SECRET;


async function verifyAccessToken(req, res, next) {
  const token = req.headers['authorization'];
  const accessToken = token && token.split(' ')[1]
  console.log(accessToken,'accessToken');

  if (!accessToken) {
    return res.status(401).json({ message: 'Access Token not provided' });
  }
   await jwt.verify(accessToken, accessSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid Access Token' });
    }
    req.userId = decoded.userId;
    return res.status(200).json({message: 'Access Token provided'});
  });
}


module.exports = {verifyAccessToken};
