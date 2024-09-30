const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) =>{
    try {
        const token = req.headers["authtoken"]
        //console.log(token)
        if(!token){
            return res.status(401).send('No-token')
        }
        // import jwt
        const decoded = jwt.verify(token, 'jwtsecret')
        
        console.log(decoded)
        req.user = decoded.user
        next();

    } catch (err) {
        console.log(err)
        res.send('Token is invalid').status(500)
    }
}