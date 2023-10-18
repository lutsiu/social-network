import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String, 
    unique: true,
    required: true,
    maxlength: 30,
  },
  fullName: {
    type: String,
    required: true,
    minlength: 2
  },
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 100,
  },
  bio: {
    type: String,
    default: ''
  },
  
  password: {
    type: String,
    required: true,
    minlength: 8,
  }, 
  profileImg: {
    type: String,
    default: ''
  },
  followers: {
    type: Array,
    default: []
  },
  following: {
    type: Array,
    default: []
  },
  confirmationCode: {
    type: Number,
  },
  verifiedEmail: {
    type: Boolean,
    required: true, 
    default: false
  },
  verifiedToken: {
    type: Boolean,
    required: true, 
    default: false
  },
  circleOfPeople: {
    type: Array,
    default: []
  },
  tweets: {
    type: Array,
    default: []
  },
  likedTweets: {
    type: Array,
    default: []
  },
  retweetedTweets: {
    type: Array,
    default: []
  },
  bookmarkedTweets: {
    type: Array, 
    default: []
  },
  joiningDate: {
    type: Date
  },
  replies: [
    {
      reply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tweet',
        required: true,
      },
      toWhom: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
  ],
});
userSchema.path('replies').default([]);
export default mongoose.model('user', userSchema);