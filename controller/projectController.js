const { validateProjectInput } = require('../validator/projectValidator');
const Project = require('../models/projectModel');
const projectService = require('../services/projectService');

async function createProject(req, res) {
  const { error } = validateProjectInput({ ...req.body, createdBy: req.user.id });
  if (error) {
    return res.status(400).json({ errors: error.details.map(e => e.message) });
  }
  try {
    const project = await projectService.createProject(req.body, req.user.id);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project', details: err.message });
  }
}

async function getProjects(req, res) {
  try {
    const projects = await Project.find({ createdBy: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects', details: err.message });
  }
}

async function getProject(req, res) {
  try {
    const project = await Project.findOne({ id: req.params.id, createdBy: req.user.id });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch project', details: err.message });
  }
}

async function updateProject(req, res) {
  const { error } = validateProjectInput({ ...req.body, createdBy: req.user.id });
  if (error) {
    return res.status(400).json({ errors: error.details.map(e => e.message) });
  }
  try {
    const updated = await Project.findOneAndUpdate(
      { id: req.params.id, createdBy: req.user.id },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Project not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project', details: err.message });
  }
}

async function deleteProject(req, res) {
  try {
    const deleted = await Project.findOneAndDelete({ id: req.params.id, createdBy: req.user.id });
    if (!deleted) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project', details: err.message });
  }
}

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
};