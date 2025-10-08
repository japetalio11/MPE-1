const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  createdBy: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

module.exports = Task;

