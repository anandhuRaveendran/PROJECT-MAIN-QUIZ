const jwt = require("jsonwebtoken");
const userTokens = {};

function verifyToken(req, res, next) {
  // console.log('middle',req.cookies)
  const token = req.cookies.Authtoken;
  userTokens[user.email] = token;

  // const email = req.cookies.email
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, "your-secret-key");
    // req.userType = decoded.email;
    console.log(decoded)
    req.useremail = decoded.useremail;
    console.log(req.email)
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
