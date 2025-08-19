const mongoose = require('mongoose');

const userLoginHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true },
  loginAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('UserLoginHistory', userLoginHistorySchema);

