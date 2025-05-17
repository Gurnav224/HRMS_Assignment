const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const HR = require("../models/user.model");

exports.register = async (req, res) => {
    const { fullName, email, password, confirm_password } = req.body;
    try {
        if (!fullName || !email || !password || !confirm_password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (password !== confirm_password) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        const isExist = await HR.findOne({ email });
        if (isExist) {
            return res.status(409).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newHr = new HR({ fullName, email, password: hashPassword });
        const savedHr = await newHr.save();
    
        const hrUser = {
            _id: savedHr._id,
            fullName: savedHr.fullName,
            email: savedHr.email
        }

        const token = jwt.sign({ hr_id: savedHr._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_IN });

        res.cookie('token', token, {
            maxAge: 3600000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        }).status(201).json({ message: 'registration successful',user:hrUser , token });
    } catch (error) {
        console.error("registration error:", error);
        res.status(500).json({ error: "Failed to register user" + error.message });
    }
};


exports.login = async (req,res) => {
    const { email , password } = req.body;
    try {

        if(!email || !password) {
            return res.status(400).json({error:"email and password field required"})
        }

        const user = await HR.findOne({email});
        if(!user) {
            return res.status(404).json({error:'hr not found with this email'})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) {
            return res.status(401).json({error:'invalid password'});
        }

        const token = jwt.sign({hr_id:user._id},process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRE_IN});

        const hrUser = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        }

        res.cookie('token',token,{
            maxAge: 3600000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        }).status(200).json({message:'login successfully',user:hrUser,token});
    } catch (error) {
        console.error('failed to login', error);
        res.status(500).json({error:'failed to login: ' + error.message});
    }
};

