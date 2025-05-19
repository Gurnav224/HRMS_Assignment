const router = require('express').Router();
const multer = require('multer');
const storage = require('../config/storage');
const verifyToken = require('../middlewares/verifytoken');
const { addCandidate , getCandidates , downloadCandidateResume , deleteCandidate , updateCandidateStatus} = require('../controllers/candidate.controller');


// Configure multer with the cloudinary storage
const upload = multer({storage: storage}); 

// File upload middleware must come before other middleware
router.post('/add', upload.single('resume'), verifyToken, addCandidate);
router.get('/all', verifyToken, getCandidates);
router.get('/resume/:id', verifyToken, downloadCandidateResume);
router.delete('/:id', verifyToken, deleteCandidate);
router.patch('/status/:id', verifyToken, updateCandidateStatus);

module.exports = router; 
