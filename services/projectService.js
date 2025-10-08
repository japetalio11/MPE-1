const Project = require('../models/projectModel');
const { v4: uuidv4 } = require('uuid');

async function createProject(projectData, userId) {
  const newProject = new Project({
    id: uuidv4(),
    name: projectData.name,
    description: projectData.description || '',
    createdBy: userId
  });
  return await newProject.save();
}

module.exports = {
  createProject
};