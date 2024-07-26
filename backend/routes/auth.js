const express = require("express");
const router = express.Router();
const User = require("../Models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const multer = require('multer');
const path = require('path');
const verifyToken = require("../middleware/authMiddleware");

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add a timestamp to the original file name
  }
});
const upload = multer({ storage: storage });

router.post('/signup', upload.single('profilePicture'), async (req, res) => {
  try {
    console.log(req.body,'imagesignup')
    const { username, password, phone, email } = req.body;
    const profilePicture = req.file.filename; // Get the filename of the uploaded file

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email, phone, profilePicture });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log('err', error);
    res.status(500).json({ error: 'Registration failed' });
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
      uername: user.username,
      profilePicture: user.profilePicture,

    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
});

router.get("/logout", (req, res) => {

  res.clearCookie("Authtoken");
  res.clearCookie("User");
  res.clearCookie("username");

  res.status(200).send("Logout successful");
});

router.get('/profile',verifyToken, async (req, res) => {
  try {
    // Assume userID is retrieved from the auth token or session
    // const userID = req.useremail;
    console.log(req.email,'profile')
    const email=req.useremail
    const user = await User.findOne({email:email});

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      username: user.username,
      email: user.email,
      phone: user.phone,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.log('err', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

module.exports = router;
