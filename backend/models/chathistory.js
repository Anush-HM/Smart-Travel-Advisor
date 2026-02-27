const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true
  },
  sessionId: {
    type: String,
    default: 'anonymous'
  },
  messages: [{
    sender: { 
      type: String, 
      enum: ['user', 'bot'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: { 
      type: Date, 
      default: Date.now 
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ChatHistory', chatHistorySchema);