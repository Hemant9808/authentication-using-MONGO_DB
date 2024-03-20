import express from 'express'
import dotenv from 'dotenv'
import { UserRouter } from './routes/user.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors(
    {origin:["http://localhost:3001"],
    credentials:true,
}
));
app.use(cookieParser())
app.use('/auth',UserRouter)


mongoose.connect('mongodb://127.0.0.1:27017/authencation')
app.get('/',(req,res)=>{
    res.send('hello world');
});

app.listen(process.env.PORT,()=>
{console.log("server started");
});