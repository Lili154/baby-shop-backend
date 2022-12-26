import  express  from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import productRouter from "./routes/product.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js";
import cors from "cors";
import * as dotenv from 'dotenv' 
dotenv.config()


const app = express();


app.use(cors());
app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);




mongoose.set('strictQuery', true)
mongoose
.connect(process.env.MONGO_URL)
.then(()=>console.log('DB ok'))
.catch((err)=>console.log('DB error',err));	




app.listen(process.env.PORT || 5000,(err)=>{
	if (err){
	return console.log("err...")
}
 console.log('server is running')
});

