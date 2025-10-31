exports.adminMiddleware = (req, res, next) => {
    // This middleware should run AFTER the standard authMiddleware
    if (req.user && req.user.role === 'admin') {
        next(); // User is an admin, proceed to the controller function
    } else {
        res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
};