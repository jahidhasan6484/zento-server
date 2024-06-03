const { createJWT } = require("../../utils/jsonwebtoken");
const User = require("./user.model");

const registerUser = async (req, res) => {
  try {
    const { email, name } = req.body;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      const { email, name } = isUserExist;
      const token = await createJWT(email, name);

      return res.status(200).json({
        token,
        message: "Login successful",
      });
    }

    const newUser = new User({ email, name });
    await newUser.save();

    const token = await createJWT(newUser.email, newUser.name);

    res.status(201).json({
      token,
      message: "Regster & login successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const { _id, role } = user;
    const token = await createJWT(_id, email, role);

    return res.status(200).json({
      token,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const profile = async (req, res) => {
  try {
    const email = req.email;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const email = req.email;
    const image = req?.image;

    const { name, address, dateOfBirth, gender, maritalStatus, contactNumber } =
      req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    if (name) user.name = name;
    if (address) user.address = address;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (gender) user.gender = gender;
    if (maritalStatus) user.maritalStatus = maritalStatus;
    if (contactNumber) user.contactNumber = contactNumber;
    if (image) user.image = image;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the profile",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  profile,
  updateProfile,
};
