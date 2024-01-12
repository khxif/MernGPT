import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  role: {
    type: String,
  },
  content: {
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: [chatSchema],
});

const User = mongoose.model("User", userSchema);

export default User;
