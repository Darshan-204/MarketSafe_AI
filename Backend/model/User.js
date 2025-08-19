const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'consumer'], required: true },
  product: {
    type: [String],
    required: function() { return this.role === 'consumer'; },
    default: undefined
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
