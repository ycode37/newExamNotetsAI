import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    let token = req.cookies?.token;
    // Also check Authorization header for cross-origin deployments
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ message: "Log In Again" });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).json({ message: "Unwanted Access Denied" });
    }
    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default isAuth;
