const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');
const router = express.Router();

// Routes for comments
router.post('/', authenticate, createComment);           // Create a comment
router.get('/:taskId', authenticate, getComments);       // Get all comments for a task
router.put('/:id', authenticate, updateComment);         // Update a comment
router.delete('/:id', authenticate, deleteComment);      // Delete a comment

module.exports = router;