const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const router = express.Router();

// Routes for tasks
router.post('/', authenticate, createTask);          // Create a task
router.get('/:projectId', authenticate, getTasks);   // Get all tasks for a project
router.put('/:id', authenticate, updateTask);        // Update a task
router.delete('/:id', authenticate, deleteTask);     // Delete a task

module.exports = router;