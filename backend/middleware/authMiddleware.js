const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // console.log('middle',req.cookies)
  const token = req.cookies.Authtoken;
  const email = req.cookies.email
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, "your-secret-key");
    // req.userType = decoded.email;
    req.email = decoded.email;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
