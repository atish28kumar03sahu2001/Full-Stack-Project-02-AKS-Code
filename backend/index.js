// backend/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { PlayerRouter } from './routes/index.js';

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, 'uploads');

const database = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            serverSelectionTimeoutMS: 30000,
        })
        console.log("Database Connected Successfully!");
    } catch (error) {
        console.log("Database Connection Error:", error);
    }
}
database();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'dist')));
app.use('/uploads', express.static(uploadsDir));
app.use('/users',PlayerRouter);

app.get("/",(req, res) => {
    res.json({ msg: "Backend Server Connected Successfully!"})
});

app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Backend Server Connected In The Port http://localhost:${process.env.PORT} `);
});