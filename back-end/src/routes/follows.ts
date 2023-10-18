import express, { NextFunction, Request, Response } from "express";
import User from "../models/User.ts";

const router = express.Router();

router.patch("/add-following", async (req, res) => {
  try {

    const { userId, followingUserId } = req.body;
    const myUser = await User.findById(userId);
    const followingUser = await User.findById(followingUserId);
    const isAlreadyFollowed = myUser.following.some((id) => id === followingUserId);
    if (isAlreadyFollowed) {
      return res.status(204);
    }
    console.log(myUser, followingUser);
    myUser.following.push(followingUserId);
    await myUser.save();
    followingUser.followers.push(userId);
    await followingUser.save();
    res.status(204);
  } catch (err) {
    res.status(409).json("Some error occured");
  }
});

router.patch("/delete-following", async (req, res) => {
  try {
    const { userId, followingUserId } = req.body;
    const myUser = await User.findById(userId);
    const followingUser = await User.findById(followingUserId);
    const myUserContainsFollowingUser = myUser.following.some(id => id === followingUserId);
    const followingUserContainsMyUser = followingUser.followers.some(id => id ===userId);
    if (!myUserContainsFollowingUser && !followingUserContainsMyUser) {
      return res.status(204);
    }
    myUser.following = myUser.following.filter((id, i) => id !== followingUserId);
    await myUser.save();
    followingUser.followers = followingUser.followers.filter((id, i) => id !== userId);
    await followingUser.save();
    res.status(204);
  } catch (err) {
    res.status(409).json("Some error occured");
  }
});

router.patch("/delete-follower", (req, res) => {});

export default router;
