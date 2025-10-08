const Project = require('../models/projectModel');
const Task = require('../models/taskModel');
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

async function getAllProjectsWithTasks(userId) {
  const projects = await Project.find({ createdBy: userId }).lean();
  const projectIds = projects.map(p => p.id);
  const tasks = await Task.find({ createdBy: userId }).lean();

  return projects.map(project => ({
    ...project,
    tasks: rootTaskDispose
  }));
}

module.exports = {
  createProject,
  getAllProjectsWithTasks
};