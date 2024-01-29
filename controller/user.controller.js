const { User } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const dotenv = require('dotenv');
dotenv.config();
const accessTime = process.env.ACCESS_TOKEN_ACTIVE_TIME;
const refreshTime = process.env.REFRESH_TOKEN_ACTIVE_TIME;
const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

//Generate Access Token
function generateAccessToken(userId) {
  return jwt.sign({ userId }, accessSecret, { expiresIn: accessTime });
}

// Generate Refresh Token
function generateRefreshToken(userId) {
  return jwt.sign({ userId }, refreshSecret, { expiresIn: refreshTime });
}

async function register(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const { name, surname, email, username, password, role } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser)
      return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      surname,
      email,
      username,
      password: hashedPassword,
      role: role || "user",
    });
    await newUser.save();

    res.status(201).json({ message: "User inserted", data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// async function login(req, res) {
//   try {
//     const { username, password } = req.body;

//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ message: "invalid credentials" });
//     }
//     delete user.password;

//     const userId = user._id;
//     console.log(user);
//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user._id);

//     return res
//       .status(200)
//       .json({ userId, username, accessToken, refreshToken, role: x });
//   } catch (error) {
//     return res.status(500).json({ message: "Error logging in" });
//   }
// }

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Sending user details in response
    res.status(200).json({
      userId: user._id,
      username: user.username,
      accessToken,
      refreshToken,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
}



//Update User Details
async function updateUserDetails(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const { userId } = req.params;
    const { name, surname, email, username, password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Update user details
    user.name = name || user.name;
    user.surname = surname || user.surname;
    user.email = email || user.email;
    user.username = username || user.username;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({ message: "User details updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user details" });
  }
}

async function logOut(req, res) {
  const token = req.headers.authorization;
  const blacklistedTokens = new Set();

  if (!token) {
    return res.status(400).json({ message: "Token not provided" });
  }
  const tokenValue = token.split(" ")[1];

  blacklistedTokens.add(tokenValue);

  res.json({ message: "Logout successful" });
}


async function verifyRefreshToken(req, res) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh Token not provided" });
    }

    // Verify the refresh token
    jwt.verify(refreshToken, refreshSecret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Refresh Token" });
      }

      // Get the user ID from the decoded token
      const { userId } = decoded;

      // Retrieve the user from the database
      const user = await User.findById(userId);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Generate a new access token
      const newAccessToken = generateAccessToken(userId);

      // Respond with the new access token
      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    // Handle any errors that occur during the verification process
    res.status(500).json({ message: "Error verifying refresh token" });
  }
}

module.exports = {
  register,
  login,
  updateUserDetails,
  logOut,
  verifyRefreshToken,
};
