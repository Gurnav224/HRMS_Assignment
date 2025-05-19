const candidate = require('../models/candidates.model');
const Candidate = require('../models/candidates.model');
const axios = require('axios')

exports.addCandidate = async (req,res) => {
  const {name,email,phone,position,status,experience} = req.body;
  console.log(req.body)
  console.log(req.file)
  try {
    if(!req.file || !req.file.path) {
      return res.status(400).json({message:'No file uploaded'});
    }

    if(! [name,email,phone,position,experience].every(Boolean)) {
      return res.status(400).json({message:'All fields are required'});
    }

    const newCandidate = new Candidate({
      name,
      email,
      phone,
      position,
      status,
      experience,
      resume: req.file.path
    });

    const candidate = await newCandidate.save();

    res.status(201).json(candidate);

  } catch (error) {
    console.error('failed create new candidate error', error.message);
    res.status(500).json({error:'failed create new candidate'})
  }
}


exports.getCandidates = async (req,res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    console.error('failed to get candidates', error.message);
    res.status(500).json({error:'failed to get candidates'})
  }
}




exports.downloadCandidateResume = async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await Candidate.findById(id);
    if (!candidate) {
      return res.status(404).json({message: 'Candidate not found'});
    }
    
    if (!candidate.resume) {
      return res.status(404).json({message: 'Resume URL not found'});
    }
    
    // Simply return the resume URL to the client
    res.status(200).json({ resumeUrl: candidate.resume });
    
  } catch (error) {
    console.error('Failed to get resume URL', error);
    res.status(500).json({error: 'Failed to get resume URL'});
  }
} 

exports.deleteCandidate = async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await Candidate.findByIdAndDelete(id);
    if (!candidate) {
      return res.status(404).json({message: 'Candidate not found'});
    }
    res.status(200).json({message: 'Candidate deleted successfully'});
  } catch (error) {
    console.error('Failed to delete candidate', error);
    res.status(500).json({error: 'Failed to delete candidate'});
  }
}



exports.updateCandidateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const candidate = await Candidate.findByIdAndUpdate(id, { status }, { new: true });
    if (!candidate) {
      return res.status(404).json({message: 'Candidate not found'});
    }
    res.status(200).json(candidate);
  } catch (error) {
    console.error('Failed to update candidate status', error);
    res.status(500).json({error: 'Failed to update candidate status'});
  }
}
