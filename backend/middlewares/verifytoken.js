
const jwt = require('jsonwebtoken')


const verifyToken = (req, res,next) => {
    const authHeader = req.headers.cookie;
     if (!authHeader || !authHeader.startsWith('token=')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

    const token = authHeader.split('=')[1];
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode;
        next()
    } catch (error) {
         return res.status(401).json({ message: 'Invalid or expired token' });
    }

}

module.exports = verifyToken;