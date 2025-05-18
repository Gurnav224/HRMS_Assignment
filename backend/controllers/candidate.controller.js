const Candidate = require('../models/candidates.model');


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

    const savedCandidate = await newCandidate.save();

    res.status(201).json({message:'Candidate added successfully',candidate:savedCandidate});

  } catch (error) {
    console.error('failed create new candidate error', error.message);
    res.status(500).json({error:'failed create new candidate'})
  }
}


exports.getCandidates = async (req,res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json({message:'get candidates successfully',candidates});
  } catch (error) {
    console.error('failed to get candidates', error.message);
    res.status(500).json({error:'failed to get candidates'})
  }
}




exports.downloadCandidateResume = async (req,res) => {
  const { id } = req.params;
  try {
    const candidate = await  Candidate.findById(id);
    if(!candidate) {
      return res.status(404).json({message:'Candidate not found'});
    }
    res.redirect(candidate.resume);
  } catch (error) {
    console.error('failed to download resume', error.message);
    res.status(500).json({error:'failed to download resume'})
  }
} 