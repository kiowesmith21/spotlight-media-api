const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    //look for authorization header in request, replace remove 'Bearer' prefix. ? = if auth header is missing or null, prevents errors
    const token = req.header('Authorization')?.replace('Bearer ', ''); //MAKE SURE TO GET RID OF SPACE AFTER BEARER ASWELL

    if (!token) return res.status(401).json({ message: 'Access denied. No token provided'});

    try {
        //check token against secret to see if verify the token's signature
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; //attach userId to request for use in other routes
        next(); //break out of this, move to next requests from other routes 
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = { authenticateJWT };