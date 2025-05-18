
const mongoose = require('mongoose');

 const CandidateSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['New','Scheduled' ,'Ongoing','Selected','Rejected']
    },
    experience:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:true
    }
 })


 const candidate = mongoose.model('Candidate',CandidateSchema);

 module.exports = candidate;
 