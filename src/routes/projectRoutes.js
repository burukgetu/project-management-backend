const express = require('express');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const router = express.Router();

// Routes for projects
router.post('/', authenticate, createProject);      // Create a project
router.get('/', authenticate, getProjects);         // Get all projects
router.put('/:id', authenticate, updateProject);    // Update a project
router.delete('/:id', authenticate, deleteProject); // Delete a project


module.exports = router;