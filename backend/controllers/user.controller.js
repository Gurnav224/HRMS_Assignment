const HR = require("../models/user.model");


exports.getHrProfile = async (req , res) => {
    try{
        const profile = await HR.findById({_id:req.user.hr_id}).select('_id fullName email');

        res.status(200).json({error:'get hr profile successfully',profile})
    }
    catch(error){
        console.error('failed to get Hr profile');
        res.status(500).json({error:"failed to get Hr profile"})
    }
}