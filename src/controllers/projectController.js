const Project =  require('../models/Project');

const createProject = async (req, res) => {
    const { name, description, status} = req.body;

    try {
        const newProject = new Project ({
            name,
            description,
            status,
            owner: req.user._id,
        })

        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
      res.status(500).json({ message: 'Server error' }); 
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user._id })
        res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
;}

const updateProject = async (req, res) => {
    const { id } = req.params;
    const { name, description, status } = req.body;
    try {
       const project = await Project.findById(id);
       if (!project) {
        return res.status(404).json({ message: 'Project not found' });
       }

       if (project.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized' });
       }

       project.name = name || project.name;
       project.description = description || project.description;
       project.status = status || project.status;

       await project.save();
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const  deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
    
        await Project.findByIdAndDelete(id);
        res.status(200).json({ message: 'Project deleted' });
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
};

module.exports =  { createProject, getProjects, updateProject, deleteProject};