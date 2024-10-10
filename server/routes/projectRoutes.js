const express = require('express');
const router = express.Router();
const Project = require('../models/projectModel');
const authMiddleware = require("../middlewares/authMiddleware");


router.post("/add-project", authMiddleware, async (req, res) => {
    try {
        // Create a new project with the user ID from the auth middleware
        const newProject = new Project({
            ...req.body,
            user: req.body.userId
        });
        await newProject.save();
        res.status(200).send({
            success: true,
            message: "Project added successfully",
            project: newProject
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message,
        });
    }
});

router.post(
    "/get-all-projects-by-user",
    authMiddleware,
    async (request, response) => {
      try {
        const projects = await Project.find({ user: request.body.userId });
        response.send({
          success: true,
          message: "Projects fetched successfully",
          data: projects,
        });
      } catch (err) {
        response.status(500).send({
          success: false,
          message: err.message,
        });
      }
    }
  );

  router.get("/get-current-project", authMiddleware, async (req, res) => {
    try {
      const { projectName } = req.query; 
      const userId = req.body.userId; 
  
      const project = await Project.findOne({ name: projectName, user: userId });
      console.log("project=>",project);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
  
      res.json({
        success: true,
        message: "Project fetched successfully",
        data: project._id, 
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });



router.post("/update-project-time", authMiddleware, async (req, res) => {
  try {
      const { projectName } = req.body;
      const userId = req.body.userId;

     
      const project = await Project.findOneAndUpdate(
          { name: projectName, user: userId },
          { updatedAt: Date.now() },  
          { new: true }  
      );

      if (!project) {
          return res.status(404).json({ success: false, message: "Project not found" });
      }

      res.json({
          success: true,
          message: "Project update time recorded",
          data: project,
      });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});


    

    

   
  

module.exports = router;
