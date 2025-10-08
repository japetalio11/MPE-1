const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
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

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

module.exports = Project;