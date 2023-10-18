import User from "../models/User.ts";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import nodemailer, { sendMail, restorePassword } from "../utils/nodemailer.ts";
import randomise from "../utils/randomise.ts";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
export const signUpStep1 = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmedPassword } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(409).json({ message: "Some credentials are wrong" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "This email is already used." });
    }

    const salt = await bcrypt.genSalt(12);
    const safePassword = await bcrypt.hash(password, salt);

    // code that will be sent to gmail

    const confirmationCode = randomise;

    const newUser = new User({
      email,
      fullName: name,
      password: safePassword,
      confirmationCode,
      userName: `${name}-${confirmationCode}`,
      joiningDate: new Date(Date.now())
    });
    await newUser.save();
    sendMail(email, confirmationCode);
    res.status(200).json({ userId: newUser._id });
  } catch (err) {
    console.log(err.message);
    return res
      .status(409)
      .json({ message: "Sorry, our server have some errors" });
  }
}

export const signUpStep2 = async (
  req: Request,
  res: Response,

) => {
  const { userId, confirmationCode } = req.body;

  const user = await User.findById(userId);

  if (user.confirmationCode !== confirmationCode) {
    return res.status(400).json({ message: "Invalid confimation code" });
  }

  user.confirmationCode = null;
  user.verifiedEmail = true;
  user.save();

  res.status(200).json({ message: `Your email is confirmed` });
};
export const signUpStep3 = async (req, res, next) => {
  try {
    const path = req.file.path;
    const { userName, bio, userId } = req.body;
    const userNameIsTaken = await User.findOne({ userName });
    if (userNameIsTaken) {
      return res
        .status(409)
        .json({ message: "This user name has already been taken" });
    }
    const user = await User.findById(userId);

    user.userName = userName;
    user.bio = bio;
    user.profileImg = path;
    user.save();
    res.sendStatus(204);
  } catch (err) {
    res.status(409).json({ message: "Server has some internal errors." });
  }
};

export const resendCode = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    user.confirmationCode = confirmationCode;
    await user.save();
    sendMail(user.email, confirmationCode, true);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(400).json({ message: "Something went wrong on server" });
  }
}

export const deleteUser =  async (req, res, next) => {
  const { userId } = req.params;
  await User.findByIdAndDelete(userId);
  res.sendStatus(204);
}

export const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "There is no such email" });
    }

    const passwordIsMatching = await bcrypt.compare(password, user.password);

    if (!passwordIsMatching) {
      return res.status(401).json({ message: "Invalid password" });
    }

    delete user.password;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(409).json({ message: "Something got wrong on the server side" });
  }
}

export const restoreUserPassword =async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "There is no such email" });
    }

    restorePassword(user.email, user._id.toString());
    user.password = "";
    res.sendStatus(204);
  } catch (err) {
    res.status(409).json({ message: "Something got wrong on the server side" });
  }
}