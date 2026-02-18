import jwt from "jsonwebtoken";

export const genToken = (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1D",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};
