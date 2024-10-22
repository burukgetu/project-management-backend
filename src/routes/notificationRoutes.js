const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const {
  getNotifications,
  markAsRead,
  deleteNotification,
} = require('../controllers/notificationController');
const router = express.Router();

// Routes for notifications
router.get('/', authenticate, getNotifications);       // Get all notifications for a user
router.put('/:id/read', authenticate, markAsRead);      // Mark a notification as read
router.delete('/:id', authenticate, deleteNotification);// Delete a notification

module.exports = router;
