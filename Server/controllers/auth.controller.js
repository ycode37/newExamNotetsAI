import User from "../models/user.model.js";
import { genToken } from "../utils/token.js";

export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email });
    }
    let token = await genToken(user._id);
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    };

    res.cookie("token", token, cookieOptions);
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` });
  }
};

export const logout = async (req, res) => {
  try {
    await res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` });
  }
};
