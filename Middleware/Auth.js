const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access denied, token missing!" });
    }

    try {
        const verified = jwt.verify(token, process.env.ACCESS_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token!" });
    }
}
const checkAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role == 'admin') {
            next();
        } else {
            res.status(403).json({ message: "Access denied, admin only!" });
        }
    });
}
module.exports = {verifyToken, checkAdmin}