import mongoose from "mongoose";


enum audienceOption {
  EVERYONE = 'everyone',
  CIRCLE = 'circle',
}
enum whoCanReply { 
  EVERYONE = 'everyone',
  FOLLOWING = 'following'
}

const tweetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  images: {
    type: Array,
    default: [],
  },
  likes: {
    type: Array, 
    default: []
  },
  retweets: {
    type: Array, 
    default: []
  },
  bookmarks: {
    type: Array, 
    default: []
  },
  views: {
    type: Array, 
    default: []
  },
  replies: {
    type: Array, 
    default: []
  },
  whoCanReply: {
    type: String, 
    enum: Object.values(whoCanReply),
    default: whoCanReply.EVERYONE
  },
  audience: {
    type: String, 
    enum: Object.values(audienceOption),
    default: audienceOption.EVERYONE
  },
  createdAt: Date,
  description: String,
})

export default mongoose.model('tweet', tweetSchema)