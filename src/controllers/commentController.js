const Comment = require('../models/Comment');
const Task = require('../models/Task');
const { createNotification } = require('./notificationController');

// Create a new comment
const createComment = async (req, res) => {
  const { content, task } = req.body;
  try {
    // Check if the task exists
    const existingTask = await Task.findById(task);
    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const newComment = new Comment({
      content,
      task,
      author: req.user._id,
    });

    await newComment.save();
    res.status(201).json(newComment);

    // After saving the new comment in the `createComment` function
  await createNotification(existingTask.assignedTo, `New comment added to task: ${existingTask.title}`, existingTask._id);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all comments for a specific task
const getComments = async (req, res) => {
  const { taskId } = req.params;
  try {
    const comments = await Comment.find({ task: taskId }).populate('author', 'name email');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a comment
const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Ensure the user is the author of the comment
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update comment content
    comment.content = content || comment.content;

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Ensure the user is the author of the comment
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createComment, getComments, updateComment, deleteComment };
