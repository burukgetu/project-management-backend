const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  uploadFile,
  getFiles,
  deleteFile,
} = require('../controllers/fileController');
const router = express.Router();

// Routes for file management
router.post('/', authenticate, upload.single('file'), uploadFile); // Upload a file
router.get('/:taskId', authenticate, getFiles);                    // Get all files for a task
router.delete('/:id', authenticate, deleteFile);                   // Delete a file

module.exports = router;