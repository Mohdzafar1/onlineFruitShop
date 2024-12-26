exports.verifyAdmin = (req, res, next) => {
    
    if (req.body && req.body.isAdmin) {
      next()
    } else {
      res.status(403).json({ message: "Access denied. Admins only." });
    }
  };
  

