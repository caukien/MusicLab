const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.UserController = {
  Register: async (req, res) => {
    let { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    try {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ message: "username already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const saveduser = new User({ username, password: hashedPassword });
      await saveduser.save();

      res.status(201).json(saveduser);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  Login: async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }
      if(user && isMatch){
        const token = this.UserController.GenerateToken(user)
        res.status(200).json({ message: "Login successful", token });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  GenerateToken: (user) => {
    return jwt.sign({id: user._id, username: user.username, role: user.role},
      process.env.ACCESS_KEY, {expiresIn: "10m"}
    )
  }
};
