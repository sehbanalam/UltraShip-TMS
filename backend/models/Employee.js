const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  age:        { type: Number, required: true },
  class:      { type: String },
  subjects:   [{ type: String }],
  attendance: { type: Number },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Employee', employeeSchema);
