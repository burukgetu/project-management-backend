const { default: mongoose } = require("mongoose");


const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
        default: 'Not Started',
      },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      members: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        }
      ],
    }, { timestamps: true });

    const Project = mongoose.model('Project', projectSchema);

    module.exports = Project;