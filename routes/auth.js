import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as dotenv from 'dotenv' 
dotenv.config()

const router = express.Router();

//Register
router.post("/register",async(req,res) => {
	const newUser = new User({
		username:req.body.username,
		email:req.body.email,
		password: bcrypt.hashSync(req.body.password,7)

	});

	try{
		const savedUser = await newUser.save();
		res.status(201).json(savedUser)
	}catch(err){
		res.status(500).json({"status":"user with this name or email already exists"})
	}
});

//Login
router.post("/login",async(req,res) =>{
	try{
		const user = await User.findOne({username:req.body.username});
console.log(user,user.password)
		// !user && 
		// res.status(401).json("Wrong credentials!")

		const hashedPassword = await bcrypt.compareSync(
			req.body.password,
			user.password
			
		);
		console.log(hashedPassword,1111)
		// const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

		// hashedPassword !== req.body.password && 
		// res.status(401).json("Wrong credentials!")
		if(!hashedPassword ) {
			return res.status(401).json("Wrong credentials!")
		}

console.log("dsdfd",process.env.JWT_SEC)
		const accessToken = jwt.sign({
			id:user._id,
			isAdmin:user.isAdmin,
		},
		
		process.env.JWT_SEC,
		{expiresIn:"3d"}
		);
		console.log(accessToken,process.env.JWT_SEC,222)
		const { password, ...others } = user._doc;

		res.status(200).json({...others,accessToken});

	}catch(err){
		res.status(500).json(err)
	}
	
})

export default router;