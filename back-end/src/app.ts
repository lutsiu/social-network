import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth.ts";
import followsRoute from "./routes/follows.ts";
import tweetsRoute from "./routes/tweets.ts";
import profileRoute from "./routes/profile.ts";
import searchRoute from "./routes/search.ts";
import User from "./models/User.ts";
import Tweet from "./models/Tweet.ts";
import randomise from "./utils/randomise.ts";
import { signUpStep3 } from "./controllers/auth.ts";
/* CONFIGURATION */

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors({ credentials: true }));
app.use(helmet()); // explain
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common")); // explain
app.use("/public", express.static(path.join(process.cwd(), "public")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `public`);
  },
  filename(req, file, cb) {
    cb(null, file.originalname.replace('.', `-${randomise}.`));
  },
});

export const upload = multer({ storage });

/* ROUTES WITH FILES */

app.patch(
  "/auth/signup/step-3",
  upload.single('profileImg'),
  signUpStep3
);

app.patch(
  "/edit-profile-with-image/:profile",
  upload.single("profileImg"),
  async (req, res, next) => {
    try {
      const { params, file, body } = req;
      const { profile } = params;
      const path = req.file.path;
      const user = await User.findById(profile);
      user.bio = body.bio;
      user.fullName = body.fullName;
      user.profileImg = path;
      await user.save();
      return res.sendStatus(204);
    } catch (err) {
      res.status(409).json({ message: "Server has some internal errors." });
    }
  }
);

app.patch("/edit-profile-without-image/:profile", upload.none(), async (req, res, next) => {
  try {
    const { params, body } = req;
    const { profile } = params;
    const user = await User.findById(profile);
    user.bio = body.bio;
    user.fullName = body.fullName;
    await user.save();
    return res.sendStatus(204);
  } catch (err) {
    res.status(409).json({ message: "Server has some internal errors." });
  }
});

app.post('/tweet/add-tweet', upload.array('image', 4),  async (req, res) => {
  try {
    const {body, files} = req;
    const {userId, whoCanReply, audience, description} = body;
    
    const images =  files as Express.Multer.File[];
    const imagePaths = images.map((img) => img.path);

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json('User is not found');
    }
    const newTweet = new Tweet({
      userId, 
      images: imagePaths,
      description,
      whoCanReply,
      audience,
      createdAt: new Date(),

    });
    await newTweet.save();
    user.tweets.push(newTweet._id);
    await user.save();
    return res.status(200).json(newTweet._id);
  } catch {
    res.status(409).json('Some problem on the server occured');
  }
});

/* ROUTES */

app.use("/auth", authRouter);
app.use("/follows", followsRoute);
app.use("/tweet", tweetsRoute);
app.use("/profile", profileRoute);
app.use("/search", searchRoute);
/* MONGOOSE */

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(PORT);
});
