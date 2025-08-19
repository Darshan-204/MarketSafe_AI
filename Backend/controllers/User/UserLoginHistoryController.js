const UserLoginHistory = require('../../model/UserLoginHistory');
const User = require('../../model/User');

// Call this after successful login
async function recordLogin(req, res,next) {
  try {
    const { email } = req.body;
    if (!email) return next();
    const user = await User.findOne({ email });
    if (!user) return next();
    await UserLoginHistory.create({
      user: user._id,
      email: user.email,
        loginAt: new Date(),
    });
  } catch (err) {
    // Don't block login on error, just log
    console.error('Login history error:', err.message);
    next();
  }
}

// Optional: Get login history for a user (admin or self)
async function getUserLoginHistory(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: true, message: 'Email required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: true, message: 'User not found' });
    const history = await UserLoginHistory.find({ user: user._id }).sort({ loginAt: -1 });
    res.json({ success: true, data: history });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
}

module.exports = { recordLogin, getUserLoginHistory };
