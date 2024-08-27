const asyncHandler = require("express-async-Handler");
const User = require("../model/UserSchema");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400).json({ message: "User already exists" });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10); // 2^10 times the hashing algorithm is used

  const user = await User.create({ userName, email, password: hashedPassword });
  res.status(200).json(user);
});

const loginUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  const user = await User.findOne({ email });
  const uName = await User.findOne({ userName });
  if (!uName) {
    res.status(400).json({ message: "User not found" });
    return;
  } else if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.json({
        message: "Logged in successfully",
        username: user.username,
        password: user.password,
        email: user.email,
      });
    } else {
      res.status(400).json({ message: "Incorrect password" });
    }
  }
  res.status(200).json({ message: "Invalid details register to login" });
});

const deleteUser = asyncHandler(async (req, res) => {
  const uName = await User.findOne({ userName: req.params.userName });
  if (!uName) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  await User.findByIdAndDelete(uName.id);
  res.json({ message: "User deleted successfully" });
});
module.exports = { registerUser, loginUser, deleteUser };
