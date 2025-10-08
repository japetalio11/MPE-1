const { validateTaskInput } = require('../validator/taskValidators');
const Task = require('../models/taskModel');
const taskService = require('../services/taskService');

async function createTask(req, res) {
  const { error } = validateTaskInput({ ...req.body, createdBy: req.user.id });
  if (error) {
    return res.status(400).json({ errors: error.details.map(e => e.message) });
  }
  try {
    const task = await taskService.createTask(req.body, req.user.id);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task', details: err.message });
  }
}

async function updateTask(req, res) {
  const { error } = validateTaskInput({ ...req.body, id: req.params.id, createdBy: req.user.id });
  if (error) {
    return res.status(400).json({ errors: error.details.map(e => e.message) });
  }
  try {
    const updated = await taskService.updateTask(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Task not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task', details: err.message });
  }
}

async function deleteTask(req, res) {
  try {
    const deleted = await taskService.deleteTask(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task', details: err.message });
  }
}

async function getTask(req, res) {
  try {
    const task = await Task.findOne({ id: req.params.id });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch task', details: err.message });
  }
}

async function getTasks(req, res) {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
  }
}

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTask,
  getTasks
};