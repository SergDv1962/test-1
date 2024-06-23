import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUser = await User.findOne({ username });

    if (isUser) {
      return res.json({ message: "Такий юзер вже зареєстрован" });
    }

    if (username.length === 0 || password.length === 0) {
      return res.json({ message: "Введить ім'я та пароль" });
    }
    const salt = bcrypt.genSaltSync(1);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({ username, password: hash });

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET, { expiresIn: "30d" });

    await newUser.save();

    return res.json({ newUser, message: "It`s all right", token });
  } catch (error) {
    return res.json({ message: "This is error" });
  }
};
