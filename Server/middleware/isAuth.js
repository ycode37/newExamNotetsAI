import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Log In Again" });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).json({ message: "Unwanted Access Denied" });
    }
    req.userId = verifyToken.userId;
    next();
  } catch (error) {}
};

export default isAuth;
