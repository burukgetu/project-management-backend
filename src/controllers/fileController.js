const File = require('../models/File');
const Task = require('../models/Task');
const path = require('path');
const fs = require('fs');

// Upload a file
const uploadFile = async (req, res) => {
  const { task } = req.body;
  try {
    // Check if the task exists
    const existingTask = await Task.findById(task);
    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Save file details to the database
    const newFile = new File({
      filename: req.file.filename,
      path: req.file.path,
      task,
      uploadedBy: req.user._id,
    });

    await newFile.save();
    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all files for a specific task
const getFiles = async (req, res) => {
  const { taskId } = req.params;
  try {
    const files = await File.find({ task: taskId });
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a file
const deleteFile = async (req, res) => {
  const { id } = req.params;
  try {
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Remove file from filesystem
    fs.unlinkSync(path.join(__dirname, '../../', file.path));

    // Remove file record from database
    await File.findByIdAndDelete(id);
    res.status(200).json({ message: 'File deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { uploadFile, getFiles, deleteFile };
