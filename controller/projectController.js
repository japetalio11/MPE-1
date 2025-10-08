const { validateProjectInput } = require('../validator/projectValidator');
const Project = require('../models/projectModel');
const Task = require('../models/taskModel');
const projectService = require('../services/projectService');

async function createProject(req, res) {
  const { error } = validateProjectInput({ ...req.body, createdBy: req.user.id });
  if (error) {
    return res.status(400).json({ 
      success: false,
      error: 'Validation failed',
      details: error.details.map(e => e.message)
    });
  }
  
  try {
    const project = await projectService.createProject(req.body, req.user.id);
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: {
        project,
        relatedTasks: []
      }
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to create project', 
      details: err.message 
    });
  }
}

async function getProjects(req, res) {
  try {
    const projects = await Project.find({ createdBy: req.user.id });
    
    const projectsWithTaskCount = await Promise.all(
      projects.map(async (project) => {
        const taskCount = await Task.countDocuments({ projectId: project.id });
        return {
          ...project.toObject(),
          taskCount
        };
      })
    );
    
    res.json({
      success: true,
      message: 'Projects fetched successfully',
      data: {
        projects: projectsWithTaskCount,
        count: projectsWithTaskCount.length
      }
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch projects', 
      details: err.message 
    });
  }
}

async function getProject(req, res) {
  try {
    const project = await Project.findOne({ 
      id: req.params.id, 
      createdBy: req.user.id 
    });
    
    if (!project) {
      return res.status(404).json({ 
        success: false,
        error: 'Project not found' 
      });
    }
    
    const relatedTasks = await Task.find({ projectId: req.params.id });
    
    res.json({
      success: true,
      message: 'Project fetched successfully',
      data: {
        project,
        relatedTasks,
        taskCount: relatedTasks.length
      }
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch project', 
      details: err.message 
    });
  }
}

async function updateProject(req, res) {
  const { error } = validateProjectInput({ ...req.body, createdBy: req.user.id });
  if (error) {
    return res.status(400).json({ 
      success: false,
      error: 'Validation failed',
      details: error.details.map(e => e.message)
    });
  }
  
  try {
    const updated = await Project.findOneAndUpdate(
      { id: req.params.id, createdBy: req.user.id },
      { $set: req.body },
      { new: true }
    );
    
    if (!updated) {
      return res.status(404).json({ 
        success: false,
        error: 'Project not found' 
      });
    }
    
    const relatedTasks = await Task.find({ projectId: req.params.id });
    
    res.json({
      success: true,
      message: 'Project updated successfully',
      data: {
        project: updated,
        relatedTasks,
        taskCount: relatedTasks.length
      }
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to update project', 
      details: err.message 
    });
  }
}

async function deleteProject(req, res) {
  try {
    const deleted = await Project.findOneAndDelete({ 
      id: req.params.id, 
      createdBy: req.user.id 
    });
    
    if (!deleted) {
      return res.status(404).json({ 
        success: false,
        error: 'Project not found' 
      });
    }

    const deletedTasks = await Task.find({ projectId: req.params.id });
    await Task.deleteMany({ projectId: req.params.id });
    
    res.json({
      success: true,
      message: 'Project deleted successfully',
      data: {
        project: deleted,
        deletedTasks: deletedTasks.length
      }
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete project', 
      details: err.message 
    });
  }
}

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
};