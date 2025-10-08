const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');

function auth(req, res, next) {
  req.user = { id: 'mock-user-id' };
  next();
}

router.post('/api/tasks', auth, taskController.createTask);
router.put('/api/tasks/:id', auth, taskController.updateTask);
router.delete('/api/tasks/:id', auth, taskController.deleteTask);
router.get('/api/tasks', auth, taskController.getTasks);

module.exports = router;