const express = require('express');
const router = express.Router();
const Episode = require('../models/episodeModel');
const authMiddleware = require("../middlewares/authMiddleware");
const Project = require('../models/projectModel');


router.post("/add-episode", authMiddleware, async (req, res) => {
  try {
    const { name, projectId, link } = req.body;
    const existingProject = await Project.findById(projectId);

    if (!existingProject) {
      return res.status(404).json({ message: "Project not found." });
    }
    const newEpisode = new Episode({
      name,
      project: projectId,
      link,
    });
    const savedEpisode = await newEpisode.save();

    
    existingProject.episodes.push(savedEpisode._id);
    await existingProject.save();

    res.json({
      success: true,
      message: 'Episode added successfully',
      data: newEpisode,
    });

  } catch (err) {
    console.error('Error adding episode:', err.message);
    res.status(500).send('Server Error');
  }

});


router.get("/get-all-episodes-by-projectId",authMiddleware,async(req,res)=>{
  try {
    const { projectId } = req.query;

    
    const episodes = await Episode.find({ project: projectId });

    res.status(200).json({ success: true, data: episodes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching the episodes' });
  }
})

router.get("/get-episode-by-episodeId",authMiddleware, async (req, res) => {
  try {
      const {episodeId} = req.query;
      const episode = await Episode.findById(episodeId);
      if (!episode) {
          return res.status(404).json({ message: 'Episode not found' });
      }
      res.status(200).json({success:true,data:episode});
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
});

router.put('/edit-episode', authMiddleware, async (req, res) => {
  try {
      const { episodeId } = req.query;
      const { name, link } = req.body;
      
      
      const episode = await Episode.findByIdAndUpdate(episodeId, { name, link }, { new: true });
      
      if (!episode) {
          return res.status(404).json({ message: 'Episode not found' });
      }
      
      res.status(200).json({ success: true, data: episode });
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/delete-episode-by-Id', async (req, res) => {
  try {
    const {episodeId} = req.query;
    
    
    const deletedEpisode = await Episode.findByIdAndDelete(episodeId);
    
    if (!deletedEpisode) {
      return res.status(404).json({ success: false, message: 'Episode not found' });
    }

    
    const updatedEpisodes = await Episode.find(); 

    
    res.json({ success: true, data: updatedEpisodes });
  } catch (error) {
    console.error('Error deleting episode:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



module.exports = router;