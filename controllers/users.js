// @desc    Update user
// @route   PUT /api/v1/users

const User = require("../models/User");

// @access  Private
exports.updateUser = async (req, res) => {
  try {
    const { name, email, tel, oldPassword, newPassword, confirmNewPassword, profilePicture } = req.body;

    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    // Update fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.tel = tel || user.tel;
    user.profilePicture = profilePicture || user.profilePicture;
    // If password change is requested
    if (oldPassword || newPassword || confirmNewPassword) {
      if (!oldPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({
          success: false,
          message: 'Please provide old password, new password, and confirm new password'
        });
      }
      const isMatch = await user.matchPassword(oldPassword);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Old password is incorrect'
        });
      }
      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({
          success: false,
          message: 'New password and confirm new password do not match'
        });
      }
      user.password = newPassword;
    }
    await user.save();
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
