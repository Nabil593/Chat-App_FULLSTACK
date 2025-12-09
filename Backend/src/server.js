import express from 'express';
import cors from 'cors';
import { config } from 'dotenv'
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import chatRoute from './routes/chat.js';
import connectDB from './config/mongodb.js';
import cookieParser from "cookie-parser";

// App config
config(); 
connectDB();
const app = express();
const port = process.env.PORT || 4000;



// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


// Api Endpoint
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute);
app.use('/api/chat', chatRoute);



// Default API server & Listen Port:
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log('Server is runing on PORT :' + port);
});