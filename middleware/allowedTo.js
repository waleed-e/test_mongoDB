module.exports = (...roles) => {
    console.log("roles", roles);
    return (req, res, next) => {
        console.log("User role:", req.user ? req.user.role : 'No user data');
        if (roles.includes( req.user.role)) {
            next()
        } else {
            return res.status(403).json({ message: "Access denied." });
        }
    };
};