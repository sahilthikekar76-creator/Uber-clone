const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const cors=require('cors');
const userRoute=require('./routes/userRoute');
const captainRoute=require('./routes/captainRoute');
const mapsRoute=require('./routes/mapsRoutes');
const rideRoutes=require('./routes/rideRoutes');
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
app.use('/maps',mapsRoute);
app.use('/rides',rideRoutes);

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})