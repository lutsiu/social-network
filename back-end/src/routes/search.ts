import express, { NextFunction, Request, Response } from "express";
import User from "../models/User.ts";

const router = express.Router();

router.get('/', async (req, res) => {
  try {
     const {query} = req.query;
     if (!query) {
      return res.status(404).json('No query was found');
     }
     const users = await User.find({ userName: { $regex: query, $options: 'i' } });
     if (users.length === 0) {
      return res.status(304).json([]);
     }
     res.status(200).json(users);
  } catch {
    res.status(409).json('Some server error occured')
  }
});



export default router;