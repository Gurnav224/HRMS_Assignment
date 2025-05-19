
const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.cookie;
    
    // Check if cookie exists and contains token
    if (!authHeader || !authHeader.includes('token=')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }


    // Extract token from cookie string (handles multiple cookies)
    const tokenCookie = authHeader.split(';').find(cookie => cookie.trim().startsWith('token='));
    if (!tokenCookie) {
        return res.status(401).json({ message: 'Token cookie not found' });
    }
    
    const token = tokenCookie.split('=')[1];
    
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

}

module.exports = verifyToken;
