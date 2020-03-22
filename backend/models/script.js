const mongoose = require('mongoose');

const scriptSchema = mongoose.Schema({
  operation: {type: String, required: true},
  result: {type: String, default: "TestResult"},
  creator: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true}
});

module.exports = mongoose.model('Script', scriptSchema);
