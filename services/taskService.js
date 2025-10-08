const Task = require('../models/taskModel');
const { v4: uuidv4 } = require('uuid');

async function createTask(taskData, userId) {
  const newTask = new Task({
    id: uuidv4(),
    title: taskData.title,
    description: taskData.description || '',
    createdBy: userId
  });
  return await newTask.save();
}

module.exports = {
  createTask
};