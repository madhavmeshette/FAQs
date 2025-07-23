import express from 'express'
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'
import faqRoute from './routes/faq.routes.js'

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.listen(PORT, () =>{
    connectDB();
    console.log("server has started at PORT " + PORT);
});

app.use(express.json());

app.use("/api/faqs", faqRoute);