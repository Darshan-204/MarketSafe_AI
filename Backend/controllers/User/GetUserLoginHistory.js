const User = require('../../model/User');
const UserLoginHistory = require('../../model/UserLoginHistory');

// Fetch login history for a specific user by email (admin or self)
async function GetUserLoginHistory(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: true, message: 'Email required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: true, message: 'User not found' });
    // Get login history for the last year only
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const history = await UserLoginHistory.find({ user: user._id, loginAt: { $gte: oneYearAgo } }).sort({ loginAt: -1 }).select('loginAt -_id');
    // Return only the loginAt dates as an array
    const loginDates = history.map(h => h.loginAt);
    res.json({ success: true, data: loginDates });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
}

module.exports = GetUserLoginHistory;
