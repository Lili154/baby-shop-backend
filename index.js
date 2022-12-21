import express from 'express';
import fs from 'fs';
import multer from 'multer';
import cors from 'cors';

import mongoose from 'mongoose';

import { registerValidation, loginValidation, productCreateValidation } from './validations/auth.js';

import { handleValidationErrors, checkAuth } from './utils/index.js';

import { UserController, ProductController } from './controllers/index.js';

mongoose.set('strictQuery', true);

mongoose
.connect('mongodb+srv://lilit:lilit1989@cluster0.8zzk7ua.mongodb.net/shop?retryWrites=true&w=majority')
.then(()=>console.log('DB ok'))
.catch((err)=>console.log('DB error',err));	



const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
mongoose


app.post('/auth/login', loginValidation,UserController.login);
app.post('/auth/register', registerValidation,UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);


app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
	res.json({
	  url: `/uploads/${req.file.originalname}`,
	});
  });
  
  app.get('/tags', ProductController.getLastTags);
  
  app.get('/productsproduct', ProductController.getAll);
  app.get('/productsproduct/tags', ProductController.getLastTags);
  app.get('/productsproduct/:id', ProductController.getOne);
  app.post('/productsproduct', checkAuth, productCreateValidation, handleValidationErrors, ProductController.create);
  app.delete('/productsproduct/:id', checkAuth, ProductController.remove);
  app.patch(
	'/productsproduct/:id',
	checkAuth,
	productCreateValidation,
	handleValidationErrors,
	ProductController.update,
  );
  

app.listen(3500,(err)=>{
	if (err){
	return console.log("err...")
}
 console.log('server is running')
});

