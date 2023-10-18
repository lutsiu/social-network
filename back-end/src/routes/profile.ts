import express, { NextFunction, Request, Response } from "express";
import User from "../models/User.ts";
import {__dirname, __filename} from '../app.ts'
import path from "path";
const router = express.Router();


router.get('/:profile', async (req, res) => {
  try {
    const {profile} = req.params;
 
    const userData = await User.findOne({'userName': profile});
    if (!userData) {
      return res.status(404).json('Account is not found');
    }
    return res.status(200).json(userData);
  } catch (err) {
    res.status(404).json('Account is not found');
  }
});

router.get('/users/:myUserId', async (req, res) => {
  try {
    const {myUserId} = req.params;
    const allUsers = await User.find({ _id: { $ne: myUserId } }).sort({ 'followers.length': -1 });
    if (!allUsers) return res.status(404).json("Users weren't found");
    res.status(200).json(allUsers.slice(0, 3));
  } catch(err) {
    res.status(409).json('some internal error occured');
  }
});

export default router;