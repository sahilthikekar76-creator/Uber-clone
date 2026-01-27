const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const cors=require('cors');
const userRoute=require('./routes/userRoute');
const captainRoute=require('./routes/captainRoute');
const connectDB = require('./db/db');

const app=express();
app.use(express.json());

connectDB();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/users',userRoute);
app.use('/captains',captainRoute);
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})