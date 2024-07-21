import mongoose from "mongoose";
import { Timestamp } from "../../../../../AppData/Local/deno/npm/registry.npmjs.org/mongodb/6.7.0/mongodb.d.ts";
const tweetSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxlength: 280,
  },
  type: {
    type: String,
    required: true,
    enum: ["tweet", "comment"],
  },
  comentedTweet: {
    type: mongoose.Schema.Types.ObjectId,
  },
  userName: {
    type: String,
    required: true,
  },
  comments: {
    type: [String],
  },
  likes: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
const Tweet = mongoose.model("Tweet", tweetSchema);
export default Tweet;
