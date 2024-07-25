const express = require("express");
const router = express.Router();
const User = require("../Models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post("/signup", async (req, res) => {
  try {
    const { username, password, phone, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email, phone });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password} = req.body;
  
    console.log(email, password);
    const user = await User.findOne({ email });
    console.log(user, "user");
    if (!user) {
      return res.status(401).json({ error: "Authentication failed- User doesn't exist" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed- password doesn't match" });
    }

    const token = jwt.sign({ userId: user._id, useremail: user.email, username:user.username }, "your-secret-key", {
      expiresIn: "1h",
    });



    res.cookie("Authtoken", token);
    res.cookie("User", user.email);
    res.cookie("username",user.username)
    res.json({
      status: true,
      message: "login success",
      token,
      useremail: user.email,
      uername:user.username
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
});

router.get("/logout", (req, res) => {
  const email = req.cookies.User;
  if (email) {
    delete userTokens[email];
  }

  res.clearCookie("Authtoken");
  res.clearCookie("User");

  res.status(200).send("Logout successful");
});



module.exports = router;
