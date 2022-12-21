import express from 'express';

import mongoose from 'mongoose';

import {loginValidation,productCreateValidation, registerValidation } from './validations/auth.js' ;

import { register, login, getMe } from './controllers/UserController.js';

mongoose.set('strictQuery', true);

import checkAuth from './utils/checkAuth.js';

import { UserController, ProductController } from './controllers/index.js';



mongoose
.connect('mongodb+srv://lilit:lilit1989@cluster0.8zzk7ua.mongodb.net/shop?retryWrites=true&w=majority')
.then(()=>console.log('DB ok'))
.catch((err)=>console.log('DB error',err));	


const app = express();

app.use(express.json());

app.post('/auth/login', loginValidation,UserController.login);
app.post('/auth/register', registerValidation,UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);


app.listen(3500,(err)=>{
	if (err){
	return console.log("err...")
}
 console.log('server is running')
});

