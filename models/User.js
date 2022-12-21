import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true,
	},
	lastName:{
		type:String,
		required:true,
	},
	email:{
		type:String,
		required:true,
		unique:true,
	},
	userName:{
		type:String,
		required:true,
	},
	passwordHash:{
		type:String,
		required:true,
	},

},
{
	timestamps:true,
},
);

export default mongoose.model('User',UserSchema);
