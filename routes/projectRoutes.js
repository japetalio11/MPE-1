const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');

function auth(req, res, next) {
  req.user = { id: 'mock-user-id' };
  next();
}

router.post('/api/projects', auth, projectController.createProject);
router.get('/api/projects', auth, projectController.getProjects);

module.exports = router;