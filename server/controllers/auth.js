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

    return res.json({ 
      newUser, 
      message: "Ви вдало зареєструвались", 
      token });
  } catch (error) {
    return res.json({ message: "This is error into registrate" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ message: "Такого юзера в базі немає. Зареєструйтесь спочатку" });
    }

    if (username.length === 0 || password.length === 0) {
      return res.json({ message: "Введить ім'я та пароль" });
    }
    
    const isCorrectPassword = bcrypt.compare(password, user.password)

    if(!isCorrectPassword) {
       return res.json({ message: "Пароль не корректний" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "30d" });

    return res.json({ user, message: "Ви вдало увійшли у систему", token });
  } catch (error) {
    return res.json({ message: "This is error into login" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({ message: "Такого юзера в базі немає. Зареєструйтесь спочатку" });
    }
  
    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "30d" });

    return res.json({ user, message: "Ви вдало увійшли у систему", token });
  } catch (error) {
    return res.json({ message: "Не має доступу. This is error into getMe" });
  }
};
